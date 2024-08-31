import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const candidatos = await prisma.candidato.findMany();
    res.json(candidatos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const candidato = await prisma.candidato.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(candidato);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const candidatos = await prisma.candidato.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(candidatos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const candidato = await prisma.candidato.findUnique({
      where: {
        id_candidato: Number(req.params.id),
      },
    });

    if (!candidato) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La candidato no existe" });
      return;
    }

    res.json(candidato);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.candidato.delete({
      where: {
        id_candidato: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const candidato = await prisma.candidato.update({
      where: {
        id_candidato: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(candidato);
  } catch (error) {
    next(error);
  }
});

export default router;
