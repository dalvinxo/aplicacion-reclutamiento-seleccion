import express from "express";
import bcrypt from "bcrypt";

import { prisma } from "../libs/prisma";
import { EnumHttpCode, EnumRoles } from "../types";
import { validationUser } from "../utils/validation.utils";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const usuarios = await prisma.usuario.findMany();

    res.json(usuarios);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, password, empleado_id } = req.body;

    const message = validationUser(username, password);

    if (message) {
      res.status(EnumHttpCode.BAD_REQUEST).json({ message });
      return;
    }

    const user = await prisma.usuario.findUnique({
      where: {
        user: username,
      },
    });

    if (user) {
      res.status(EnumHttpCode.BAD_REQUEST).json({
        message: "El nombre de usuario ya existe",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const usuario = await prisma.usuario.create({
      data: {
        password: hash,
        user: username,
        rol_id: EnumRoles.USER,
        empleado_id: empleado_id,
      },
    });

    res.status(EnumHttpCode.CREATED).json(usuario);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const usuarios = await prisma.usuario.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(usuarios);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id_usuario: Number(req.params.id),
      },
    });

    if (!usuario) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El usuario no existe" });
      return;
    }

    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.usuario.delete({
      where: {
        id_usuario: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        id_usuario: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

export default router;
