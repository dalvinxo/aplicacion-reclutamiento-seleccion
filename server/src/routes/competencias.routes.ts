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
    const competencias = await prisma.competencia.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id_competencia: "desc",
      },
    });

    const totalCompetencias = await prisma.competencia.count();
    const totalPages = Math.ceil(totalCompetencias / take);

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: totalCompetencias,
      competencias,
    });
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
