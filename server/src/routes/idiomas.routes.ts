import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const idiomas = await prisma.idioma.findMany();
    res.json(idiomas);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const idioma = await prisma.idioma.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(idioma);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const idiomas = await prisma.idioma.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(idiomas);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const idioma = await prisma.idioma.findUnique({
      where: {
        id_idioma: Number(req.params.id),
      },
    });

    if (!idioma) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El idioma no existe" });
      return;
    }

    res.json(idioma);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.idioma.delete({
      where: {
        id_idioma: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const idioma = await prisma.idioma.update({
      where: {
        id_idioma: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(idioma);
  } catch (error) {
    next(error);
  }
});

export default router;
