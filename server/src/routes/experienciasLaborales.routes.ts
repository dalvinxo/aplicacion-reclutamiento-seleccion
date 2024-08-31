import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const experiencias = await prisma.experienciaLaboral.findMany();
    res.json(experiencias);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const experienciaLaboral = await prisma.experienciaLaboral.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(experienciaLaboral);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const experienciasLaborales = await prisma.experienciaLaboral.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(experienciasLaborales);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const experienciaLaboral = await prisma.experienciaLaboral.findUnique({
      where: {
        id_experiencia_laboral: Number(req.params.id),
      },
    });

    if (!experienciaLaboral) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La experiencia laboral no existe" });
      return;
    }

    res.json(experienciaLaboral);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.experienciaLaboral.delete({
      where: {
        id_experiencia_laboral: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const experienciaLaboral = await prisma.experienciaLaboral.update({
      where: {
        id_experiencia_laboral: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(experienciaLaboral);
  } catch (error) {
    next(error);
  }
});

export default router;
