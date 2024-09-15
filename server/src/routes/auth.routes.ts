import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma";
import { EnumHttpCode, EnumRoles, PayloadJwt, RequestCustom } from "../types";
import { validationUser } from "../utils/validation.utils";
import { NODE_ENV, SECRET_JWT_KEY } from "../utils/config";
import { authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/logout", (_req, res) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(EnumHttpCode.OK)
      .json({ message: "Se cerró sesión correctamente" });
  } catch (error) {
    res
      .status(EnumHttpCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Ha ocurrido un error cerrando sesión" });
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
        email: true,
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

router.post("/sign-up", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const message = validationUser(username, password);

    if (message) {
      res.status(EnumHttpCode.BAD_REQUEST).json({ message });
      return;
    }

    const user = await prisma.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      res.status(EnumHttpCode.BAD_REQUEST).json({
        message: "Existe un usuario con este correo",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const usuario = await prisma.usuario.create({
      data: {
        password: hash,
        user: username,
        email: email,
        rol_id: EnumRoles.CANDIDATE,
      },
    });

    const { password: pass, estado, rol_id, ultimo_login, ...result } = usuario;

    res.status(EnumHttpCode.CREATED).json(result);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/user",
  authorize([EnumRoles.USER, EnumRoles.ADMIN, EnumRoles.CANDIDATE]),
  async (req, res, next) => {
    try {
      const auth = (req as RequestCustom<PayloadJwt>).user;

      const user = await prisma.usuario.findUnique({
        where: { id_usuario: auth.usuario_id },
        select: {
          rol_id: true,
          user: true,
          empleado_id: true,
          ultimo_login: true,
          id_usuario: true,
          email: true,
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

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user-person",
  authorize([EnumRoles.USER, EnumRoles.ADMIN, EnumRoles.CANDIDATE]),
  async (req, res, next) => {
    try {
      const auth = (req as RequestCustom<PayloadJwt>).user;

      const userId = Number(auth.usuario_id);

      const userPerson = await prisma.usuarioPersona.findFirst({
        where: {
          usuario_id: userId,
        },
        include: {
          Persona: {
            include: {
              Capacitacion: true,
              ExperienciaLaboral: true,
              PersonaCompetencia: true,
              PersonaIdioma: true,
              Candidato: true,
            },
          },
        },
      });

      if (!userPerson) {
        res
          .status(404)
          .json({ message: "Usuario no tiene información registrada" });
        return;
      }

      const { Persona } = userPerson;

      const userFilter = {
        puesto_aspirado_id: Persona.Candidato[0].puesto_aspirado_id,
        recomendado_por: Persona.Candidato[0].recomendado_por,
        salario_aspirado: Persona.Candidato[0].salario_aspirado,
        persona: {
          persona_id: Persona.id_persona,
          nombre: Persona.nombre,
          cedula: Persona.cedula,
          idioma: Persona.PersonaIdioma.map((idioma) => idioma.idioma_id),
          competencia: Persona.PersonaCompetencia.map(
            (competencia) => competencia.competencia_id
          ),
          capacitaciones: Persona.Capacitacion,
          experienciaLaboral: Persona.ExperienciaLaboral,
        },
      };

      res.json(userFilter);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:puestoId",
  authorize([EnumRoles.ADMIN, EnumRoles.USER, EnumRoles.CANDIDATE]),
  async (req, res, next) => {
    const puesto_id = Number(req.params.puestoId);

    const auth = (req as RequestCustom<PayloadJwt>).user;

    const userId = Number(auth.usuario_id);

    try {
      const persona = await prisma.usuarioPersona.findFirst({
        where: {
          usuario_id: userId,
        },
      });

      if (!persona) {
        res
          .status(EnumHttpCode.NOT_FOUND)
          .json("El candidato no fue encontrado");
        return;
      }

      const candidatos = await prisma.candidato.findFirst({
        where: {
          AND: [
            { puesto_aspirado_id: puesto_id },
            { persona_id: persona.persona_id },
          ],
        },
        include: {
          EstadoCandidato: true,
        },
      });

      if (!candidatos) {
        res
          .status(EnumHttpCode.NOT_FOUND)
          .json("El candidato no fue encontrado");
        return;
      }

      const { EstadoCandidato, estado_candidato_id, ...candidato } = candidatos;

      res.json({ ...candidato, estatus: EstadoCandidato.descripcion });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
