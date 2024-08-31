import express from "express";
import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const departamentos = await prisma.departamento.findMany();

    res.json(departamentos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const departamento = await prisma.departamento.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(departamento);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const departamentos = await prisma.departamento.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(departamentos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const departamento = await prisma.departamento.findUnique({
    where: {
      id_departamento: Number(req.params.id),
    },
  });
  res.json(departamento);
});

router.delete("/:id", async (req, res) => {
  await prisma.departamento.delete({
    where: {
      id_departamento: Number(req.params.id),
    },
  });

  res.status(EnumHttpCode.NO_CONTENT).json();
});

router.patch("/:id", async (req, res, next) => {
  try {
    const departamento = await prisma.departamento.update({
      where: {
        id_departamento: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(departamento);
  } catch (error) {
    next(error);
  }
});

export default router;
