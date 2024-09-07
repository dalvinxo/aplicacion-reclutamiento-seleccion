import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { page, limit } = req.query;

  const pages = Number(page || 1);
  const limits = Number(limit || 10);

  const skip = (pages - 1) * limits;
  const take = limits;

  try {
    const idiomas = await prisma.idioma.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id_idioma: "desc",
      },
    });

    const totalidiomas = await prisma.idioma.count();
    const totalPages = Math.ceil(totalidiomas / take);

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: totalidiomas,
      idiomas,
    });
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
