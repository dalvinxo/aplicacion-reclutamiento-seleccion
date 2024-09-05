import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode, EnumRoles } from "../types";
import { authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { page, limit } = req.query;

  const pages = Number(page || 1);
  const limits = Number(limit || 10);

  const skip = (pages - 1) * limits;
  const take = limits;

  try {
    const puestos = await prisma.puesto.findMany({
      skip: skip,
      take: take,
      where: {
        estado: true,
      },
      orderBy: {
        id_puesto: "desc",
      },
      include: {
        Departamento: {
          select: {
            id_departamento: true,
            nombre: true,
          },
        },
      },
    });

    const totalPuestos = await prisma.puesto.count({
      where: {
        estado: true,
      },
    });

    const totalPages = Math.ceil(totalPuestos / take);

    const puestosPages = puestos.map((puesto) => {
      const { departamento_id, estado, ...puestoFilter } = puesto;
      return puestoFilter;
    });

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: totalPuestos,
      puestos: puestosPages,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authorize([EnumRoles.USER, EnumRoles.ADMIN]),
  async (req, res, next) => {
    try {
      const puesto = await prisma.puesto.create({
        data: req.body,
      });

      res.status(EnumHttpCode.CREATED).json(puesto);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/multiples",
  authorize([EnumRoles.USER, EnumRoles.ADMIN]),
  async (req, res, next) => {
    try {
      const puestos = await prisma.puesto.createMany({
        data: req.body,
      });

      res.status(EnumHttpCode.CREATED).json(puestos);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.findUnique({
      where: {
        id_puesto: Number(req.params.id),
      },
    });

    if (!puesto) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El idioma no existe" });
      return;
    }

    res.json(puesto);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/competenciasYIdiomas", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.findUnique({
      where: {
        id_puesto: Number(req.params.id),
      },
      select: {
        id_puesto: true,
        nombre: true,
        descripcion: true,
        nivel_riesgo: true,
        nivel_minimo_salario: true,
        nivel_maximo_salario: true,
        _count: {
          select: {
            Candidato: true,
          },
        },
        PuestoIdioma: {
          select: {
            id_puesto_idioma: true,
            Idioma: {
              select: {
                nombre: true,
              },
            },
          },
        },
        PuestoCompetencia: {
          select: {
            id_puesto_competencia: true,
            Competencia: {
              select: {
                id_competencia: true,
                descripcion: true,
              },
            },
          },
        },
        Departamento: {
          select: {
            id_departamento: true,
            nombre: true,
          },
        },
      },
    });

    if (!puesto) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El puesto consultado no existe" });
      return;
    }

    const puestoConCompetenciaYIdioma = {
      ...puesto,
      _count: puesto._count.Candidato,
      PuestoIdioma: puesto.PuestoIdioma.map((idiomas) => idiomas.Idioma.nombre),
      PuestoCompetencia: puesto.PuestoCompetencia.map(
        (competencias) => competencias.Competencia.descripcion
      ),
    };

    res.json(puestoConCompetenciaYIdioma);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.puesto.delete({
      where: {
        id_puesto: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.update({
      where: {
        id_puesto: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(puesto);
  } catch (error) {
    next(error);
  }
});

export default router;
