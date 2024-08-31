import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const puestoIdiomas = await prisma.puestoIdioma.findMany();
    res.json(puestoIdiomas);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const puestoIdioma = await prisma.puestoIdioma.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(puestoIdioma);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const puestoIdiomas = await prisma.puestoIdioma.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(puestoIdiomas);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const puestoIdioma = await prisma.puestoIdioma.findUnique({
      where: {
        id_puesto_idioma: Number(req.params.id),
      },
    });

    if (!puestoIdioma) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El idioma asociado puesto no existe" });
      return;
    }

    res.json(puestoIdioma);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.puestoIdioma.delete({
      where: {
        id_puesto_idioma: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const puestoIdioma = await prisma.puestoIdioma.update({
      where: {
        id_puesto_idioma: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(puestoIdioma);
  } catch (error) {
    next(error);
  }
});

export default router;
