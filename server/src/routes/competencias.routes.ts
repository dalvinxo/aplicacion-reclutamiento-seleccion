import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const competencias = await prisma.competencia.findMany();
    res.json(competencias);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const competencia = await prisma.competencia.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(competencia);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const competencias = await prisma.competencia.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(competencias);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const competencia = await prisma.competencia.findUnique({
      where: {
        id_competencia: Number(req.params.id),
      },
      include: {
        PersonaCompetencia: true,
        PuestoCompetencia: true,
      },
    });

    if (!competencia) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La competencia no existe" });
      return;
    }

    res.json(competencia);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.competencia.delete({
      where: {
        id_competencia: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const competencia = await prisma.competencia.update({
      where: {
        id_competencia: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(competencia);
  } catch (error) {
    next(error);
  }
});

export default router;
