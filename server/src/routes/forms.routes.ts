import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";
import { validationUser } from "../utils/validation.utils";
import { NODE_ENV, SECRET_JWT_KEY } from "../utils/config";

const router = express.Router();

router.get("/crear-puestos", async (_req, res) => {
  try {
    const idiomas = await prisma.idioma.findMany({
      where: {
        estado: true,
      },
      select: {
        id_idioma: true,
        nombre: true,
      },
    });

    const competencias = await prisma.competencia.findMany({
      where: {
        estado: true,
      },
      select: {
        id_competencia: true,
        descripcion: true,
      },
    });

    const departamentos = await prisma.departamento.findMany({
      select: {
        id_departamento: true,
        nombre: true,
      },
    });

    res.json({ idiomas, competencias, departamentos });
  } catch (error) {
    res
      .status(EnumHttpCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Ha ocurrido un error en el servidor" });
  }
});

router.get("/crear-candidatos", async (_req, res) => {
  try {
    const idiomas = await prisma.idioma.findMany({
      where: {
        estado: true,
      },
      select: {
        id_idioma: true,
        nombre: true,
      },
    });

    const competencias = await prisma.competencia.findMany({
      where: {
        estado: true,
      },
      select: {
        id_competencia: true,
        descripcion: true,
      },
    });

    res.json({ idiomas, competencias });
  } catch (error) {
    res
      .status(EnumHttpCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Ha ocurrido un error en el servidor" });
  }
});

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
      select: {
        rol_id: true,
        user: true,
        empleado_id: true,
        ultimo_login: true,
        id_usuario: true,
        password: true,
        Empleado: {
          select: {
            Puesto: {
              select: {
                nombre: true,
                Departamento: {
                  select: {
                    nombre: true,
                  },
                },
              },
            },
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
      return;
    }

    const { password: _, ...usuario } = user;

    const token = jwt.sign(
      {
        usuario_id: user.id_usuario,
        empleado_id: user.empleado_id,
        rol: user.rol_id,
      },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json(usuario);
  } catch (error) {
    next(error);
  }
});

export default router;
