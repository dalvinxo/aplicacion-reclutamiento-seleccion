import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const estadoCandidatos = await prisma.estadoCandidato.findMany();
    res.json(estadoCandidatos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const estadoCandidato = await prisma.estadoCandidato.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(estadoCandidato);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const estadoCandidatos = await prisma.estadoCandidato.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(estadoCandidatos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const estadoCandidato = await prisma.estadoCandidato.findUnique({
      where: {
        id_estado_candidato: Number(req.params.id),
      },
    });

    if (!estadoCandidato) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El estado para los candidatos no existe" });
      return;
    }

    res.json(estadoCandidato);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.estadoCandidato.delete({
      where: {
        id_estado_candidato: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const estadoCandidato = await prisma.estadoCandidato.update({
      where: {
        id_estado_candidato: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(estadoCandidato);
  } catch (error) {
    next(error);
  }
});

export default router;
