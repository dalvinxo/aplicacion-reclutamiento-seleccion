import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const capacitaciones = await prisma.capacitacion.findMany();
    res.json(capacitaciones);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const capacitacion = await prisma.capacitacion.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(capacitacion);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const capacitaciones = await prisma.capacitacion.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(capacitaciones);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const capacitacion = await prisma.capacitacion.findUnique({
      where: {
        id_capacitacion: Number(req.params.id),
      },
    });

    if (!capacitacion) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La capacitacion no existe" });
      return;
    }

    res.json(capacitacion);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.capacitacion.delete({
      where: {
        id_capacitacion: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const capacitacion = await prisma.capacitacion.update({
      where: {
        id_capacitacion: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(capacitacion);
  } catch (error) {
    next(error);
  }
});

export default router;
