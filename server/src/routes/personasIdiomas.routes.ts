import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const personaIdiomas = await prisma.personaIdioma.findMany();
    res.json(personaIdiomas);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const personaIdioma = await prisma.personaIdioma.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(personaIdioma);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const personaIdiomas = await prisma.personaIdioma.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(personaIdiomas);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const personaIdioma = await prisma.personaIdioma.findUnique({
      where: {
        id_persona_idioma: Number(req.params.id),
      },
    });

    if (!personaIdioma) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El idioma asociado puesto no existe" });
      return;
    }

    res.json(personaIdioma);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.personaIdioma.delete({
      where: {
        id_persona_idioma: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const personaIdioma = await prisma.personaIdioma.update({
      where: {
        id_persona_idioma: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(personaIdioma);
  } catch (error) {
    next(error);
  }
});

export default router;
