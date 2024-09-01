import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";
import { validationUser } from "../utils/validation.utils";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const message = validationUser(username, password);

    if (message) {
      res.status(EnumHttpCode.BAD_REQUEST).json({ message });
      return;
    }

    const user = await prisma.usuario.findUnique({
      where: {
        user: username,
      },
      include: {
        Rol: {
          select: {
            nombre: true,
          },
        },
      },
    });

    if (!user) {
      res.status(EnumHttpCode.UNAUTHORIZE).json({
        message: "El usuario no existe",
      });
      return;
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      res.status(EnumHttpCode.UNAUTHORIZE).json({
        message: "La contraseña es incorrecta",
      });
    }

    const { password: _, ...usuario } = user;

    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

export default router;
