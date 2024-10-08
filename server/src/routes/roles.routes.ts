import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const roles = await prisma.rol.findMany();

    res.json(roles);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const rol = await prisma.rol.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(rol);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const roles = await prisma.rol.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(roles);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const rol = await prisma.rol.findUnique({
      where: {
        id_rol: Number(req.params.id),
      },
    });

    if (!rol) {
      res.status(EnumHttpCode.NOT_FOUND).json({ message: "El rol no existe" });
      return;
    }

    res.json(rol);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.rol.delete({
      where: {
        id_rol: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const rol = await prisma.rol.update({
      where: {
        id_rol: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(rol);
  } catch (error) {
    next(error);
  }
});

export default router;
