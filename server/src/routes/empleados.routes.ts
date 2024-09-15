import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { page, limit } = req.query;

  const pages = Number(page || 1);
  const limits = Number(limit || 10);

  const skip = (pages - 1) * limits;
  const take = limits;

  try {
    const empleados = await prisma.empleado.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id_empleado: "desc",
      },
      select: {
        fecha_creacion: true,
        fecha_ingreso: true,
        id_empleado: true,
        puesto_id: true,
        persona_id: true,
        salario_mensual: true,
        estado: true,
        Persona: {
          select: {
            nombre: true,
            cedula: true,
          },
        },
        Puesto: {
          select: {
            nombre: true,
            Departamento: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });

    const totalEmpleados = await prisma.empleado.count();
    const totalPages = Math.ceil(totalEmpleados / take);

    const empleadosFilter = empleados.map((empleado) => {
      const { Persona, Puesto, ...data } = empleado;

      return {
        ...data,
        nombre: Persona.nombre,
        cedula: Persona.cedula,
        puesto: Puesto.nombre,
        departamento: Puesto.Departamento.nombre,
      };
    });

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: totalEmpleados,
      empleados: empleadosFilter,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const empleado = await prisma.empleado.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(empleado);
  } catch (error) {
    next(error);
  }
});

router.get("/filtrar", async (req, res, next) => {
  const { page, limit, desde, hasta } = req.query;

  const pages = Number(page || 1);
  const limits = Number(limit || 10);
  const skip = (pages - 1) * limits;
  const take = limits;

  const today = new Date();

  try {
    // Helper para verificar que es un string
    const isValidDateParam = (param: unknown): param is string => {
      return typeof param === "string";
    };

    // Validar que los parámetros sean strings
    if (hasta && !isValidDateParam(desde)) {
      res.status(400).json({
        error: "Debe proporcionar la fecha 'desde' si se incluye 'hasta'.",
      });
      return;
    }

    let fechaDesde: Date | null = null;
    let fechaHasta: Date | null = null;

    if (isValidDateParam(desde)) {
      fechaDesde = new Date(desde);
    }

    if (isValidDateParam(hasta)) {
      fechaHasta = new Date(hasta);
    }

    // Validaciones de rango de fechas
    if (fechaDesde && fechaDesde > today) {
      res.status(400).json({
        error: "La fecha 'desde' no puede ser mayor que la fecha actual.",
      });
      return;
    }

    if (fechaDesde && fechaHasta && fechaDesde > fechaHasta) {
      res.status(400).json({
        error: "La fecha 'desde' no puede ser mayor que la fecha 'hasta'.",
      });
      return;
    }

    // Construir el filtro de fecha de ingreso si 'desde' o 'hasta' están presentes
    let fechaIngresoFilter: any = {};
    if (fechaDesde) {
      fechaIngresoFilter.gte = fechaDesde;
    }
    if (fechaHasta) {
      fechaIngresoFilter.lte = fechaHasta;
    }

    const empleados = await prisma.empleado.findMany({
      skip: skip,
      take: take,
      where: {
        ...(fechaDesde || fechaHasta
          ? { fecha_ingreso: fechaIngresoFilter }
          : {}),
      },
      orderBy: {
        id_empleado: "desc",
      },
      select: {
        fecha_creacion: true,
        fecha_ingreso: true,
        id_empleado: true,
        puesto_id: true,
        persona_id: true,
        salario_mensual: true,
        estado: true,
        Persona: {
          select: {
            nombre: true,
            cedula: true,
          },
        },
        Puesto: {
          select: {
            nombre: true,
            Departamento: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });

    const totalEmpleados = await prisma.empleado.count();
    const totalPages = Math.ceil(totalEmpleados / take);

    const empleadosFilter = empleados.map((empleado) => {
      const { Persona, Puesto, ...data } = empleado;

      return {
        ...data,
        nombre: Persona.nombre,
        cedula: Persona.cedula,
        puesto: Puesto.nombre,
        departamento: Puesto.Departamento.nombre,
      };
    });

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: totalEmpleados,
      empleados: empleadosFilter,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const empleados = await prisma.empleado.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(empleados);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const empleado = await prisma.empleado.findUnique({
      where: {
        id_empleado: Number(req.params.id),
      },
    });

    if (!empleado) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El empleado no existe" });
      return;
    }

    res.json(empleado);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.empleado.delete({
      where: {
        id_empleado: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const rol = await prisma.rol.update({
      where: {
        id_rol: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(rol);
  } catch (error) {
    next(error);
  }
});

export default router;
