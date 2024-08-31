import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const puestoCompetencias = await prisma.puestoCompetencia.findMany();
    res.json(puestoCompetencias);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const puestoCompetencia = await prisma.puestoCompetencia.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(puestoCompetencia);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const puestoCompetencias = await prisma.puestoCompetencia.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(puestoCompetencias);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const puestoCompetencia = await prisma.puestoCompetencia.findUnique({
      where: {
        id_puesto_competencia: Number(req.params.id),
      },
    });

    if (!puestoCompetencia) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La competencia asociada al puesto no existe" });
      return;
    }

    res.json(puestoCompetencia);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.puestoCompetencia.delete({
      where: {
        id_puesto_competencia: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const puestoCompetencia = await prisma.puestoCompetencia.update({
      where: {
        id_puesto_competencia: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(puestoCompetencia);
  } catch (error) {
    next(error);
  }
});

export default router;
