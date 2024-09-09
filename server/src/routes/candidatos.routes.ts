import express from "express";

import { prisma } from "../libs/prisma";
import {
  EnumHttpCode,
  EnumRoles,
  EnumStatusCandidato,
  ICreatePerson,
  PayloadJwt,
  RequestCustom,
} from "../types";
import { validationCedula } from "../utils/validation.utils";
import { authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/",
  authorize([EnumRoles.ADMIN, EnumRoles.USER]),
  async (_req, res, next) => {
    try {
      const candidatos = await prisma.candidato.findMany();
      res.json(candidatos);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const candidatos = await prisma.candidato.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(candidatos);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const candidatos = await prisma.candidato.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(candidatos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const candidato = await prisma.candidato.findUnique({
      where: {
        id_candidato: Number(req.params.id),
      },
    });

    if (!candidato) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La candidato no existe" });
      return;
    }

    res.json(candidato);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.candidato.delete({
      where: {
        id_candidato: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const candidato = await prisma.candidato.update({
      where: {
        id_candidato: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(candidato);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/detalles",
  authorize([EnumRoles.CANDIDATE]),
  async (req, res, next) => {
    const { puesto_aspirado_id, salario_aspirado, recomendado_por, persona } =
      req.body;

    const auth = (req as RequestCustom<PayloadJwt>).user;

    const {
      cedula,
      nombre,
      competencias = [],
      capacitaciones = [],
      experienciaLaboral = [],
      idiomas = [],
    } = persona as ICreatePerson;

    try {
      const cedulaIsValid = validationCedula(cedula);

      if (!cedulaIsValid) {
        res
          .status(EnumHttpCode.BAD_REQUEST)
          .json({ message: "La cédula es invalida" });
        return;
      }

      const personaCandidato = await prisma.persona.create({
        data: {
          cedula: cedula,
          nombre: nombre,
          PersonaCompetencia: {
            create: competencias.map((competencia_id) => ({
              competencia_id: competencia_id,
            })),
          },
          PersonaIdioma: {
            create: idiomas.map((idioma_id) => ({
              idioma_id: idioma_id,
            })),
          },
          ExperienciaLaboral: {
            create: experienciaLaboral,
          },
          Capacitacion: {
            create: capacitaciones,
          },
          Candidato: {
            create: {
              puesto_aspirado_id: puesto_aspirado_id,
              salario_aspirado: salario_aspirado,
              recomendado_por: recomendado_por,
              estado_candidato_id: EnumStatusCandidato.POSTULADO,
            },
          },
        },
        include: {
          Capacitacion: true,
          ExperienciaLaboral: true,
          PersonaCompetencia: true,
          PersonaIdioma: true,
          Candidato: true,
        },
      });

      await prisma.usuarioPersona.create({
        data: {
          usuario_id: auth.usuario_id,
          persona_id: personaCandidato.id_persona,
        },
      });

      res.status(EnumHttpCode.CREATED).json(personaCandidato);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id/contratar", async (req, res, next) => {
  try {
    const { fecha_ingreso, salario_mensual } = req.body;

    if (!fecha_ingreso || !salario_mensual) {
      res
        .status(EnumHttpCode.BAD_REQUEST)
        .json({ message: "Falta información para contratar al candidato" });

      return;
    }

    const result = await prisma.$transaction(async (prisma) => {
      const candidato = await prisma.candidato.update({
        where: {
          id_candidato: Number(req.params.id),
        },
        data: {
          estado_candidato_id: EnumStatusCandidato.CONTRADO,
          estado: false,
        },
      });

      const empleado = await prisma.empleado.create({
        data: {
          fecha_ingreso,
          salario_mensual,
          persona_id: candidato.persona_id,
          puesto_id: candidato.puesto_aspirado_id,
        },
        include: {
          Persona: true,
        },
      });

      return empleado;
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
