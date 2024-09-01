import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const empleados = await prisma.empleado.findMany();

    res.json(empleados);
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
