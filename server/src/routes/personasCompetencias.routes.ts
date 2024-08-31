import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const personaCompetencias = await prisma.personaCompetencia.findMany();
    res.json(personaCompetencias);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const personaCompetencia = await prisma.personaCompetencia.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(personaCompetencia);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const personaCompetencias = await prisma.personaCompetencia.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(personaCompetencias);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const personaCompetencia = await prisma.personaCompetencia.findUnique({
      where: {
        id_persona_competencia: Number(req.params.id),
      },
    });

    if (!personaCompetencia) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La competencia asociada al puesto no existe" });
      return;
    }

    res.json(personaCompetencia);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.personaCompetencia.delete({
      where: {
        id_persona_competencia: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const personaCompetencia = await prisma.personaCompetencia.update({
      where: {
        id_persona_competencia: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(personaCompetencia);
  } catch (error) {
    next(error);
  }
});

export default router;
