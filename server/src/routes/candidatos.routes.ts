import express from "express";

import { prisma } from "../libs/prisma";
import {
  EnumHttpCode,
  EnumRoles,
  EnumStatusCandidato,
  ICreatePerson,
  IUpdatePerson,
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

      const userPerson = await prisma.usuarioPersona.findFirst({
        where: {
          AND: [
            { usuario_id: auth.usuario_id },
            { persona_id: personaCandidato.id_persona },
          ],
        },
      });

      if (!userPerson) {
        await prisma.usuarioPersona.create({
          data: {
            usuario_id: auth.usuario_id,
            persona_id: personaCandidato.id_persona,
          },
        });
      }

      res.status(EnumHttpCode.CREATED).json(personaCandidato);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/detalles/:persona_id",
  authorize([EnumRoles.CANDIDATE]),
  async (req, res, next) => {
    const { puesto_aspirado_id, salario_aspirado, recomendado_por, persona } =
      req.body;

    const persona_id = Number(req.params.persona_id);

    const {
      cedula,
      nombre,
      competencias = [],
      capacitaciones = [],
      experienciaLaboral = [],
      idiomas = [],
    } = persona as IUpdatePerson;

    try {
      const candidato = await prisma.candidato.findFirst({
        where: {
          AND: [
            { persona_id: persona_id },
            { puesto_aspirado_id: puesto_aspirado_id },
          ],
        },
      });

      if (!candidato) {
        await prisma.candidato.create({
          data: {
            puesto_aspirado_id: puesto_aspirado_id,
            salario_aspirado: salario_aspirado,
            recomendado_por: recomendado_por,
            persona_id: persona_id,
            estado_candidato_id: EnumStatusCandidato.POSTULADO,
          },
        });
      } else {
        await prisma.candidato.update({
          where: { id_candidato: candidato.id_candidato },
          data: {
            puesto_aspirado_id: puesto_aspirado_id,
            salario_aspirado: salario_aspirado,
            recomendado_por: recomendado_por,
          },
        });
      }

      const capacitacionesActuales = await prisma.capacitacion.findMany({
        where: { persona_id: persona_id },
        select: { id_capacitacion: true },
      });

      const capacitacionesActualesIds = capacitacionesActuales.map(
        (c) => c.id_capacitacion
      );

      const capacitacionesAEliminar = capacitacionesActualesIds.filter(
        (capacitacion_id) =>
          !capacitaciones.some((c) => c.capacitacion_id === capacitacion_id)
      );

      const capacitacionesAAgregar = capacitaciones.filter(
        (capacitacion) =>
          !capacitacionesActualesIds.includes(capacitacion.capacitacion_id)
      );

      if (capacitacionesAEliminar.length > 0) {
        await prisma.capacitacion.deleteMany({
          where: {
            persona_id: persona_id,
            id_capacitacion: { in: capacitacionesAEliminar },
          },
        });
      }

      if (capacitacionesAAgregar.length > 0) {
        const nuevasCapacitaciones = capacitacionesAAgregar.map(
          (capacitacion) => ({
            persona_id: persona_id,
            ...capacitacion,
          })
        );

        await prisma.capacitacion.createMany({
          data: nuevasCapacitaciones,
        });
      }

      const experienciasActuales = await prisma.experienciaLaboral.findMany({
        where: { persona_id: persona_id },
        select: { id_experiencia_laboral: true },
      });

      const experienciasActualesIds = experienciasActuales.map(
        (e) => e.id_experiencia_laboral
      );

      const experienciasAEliminar = experienciasActualesIds.filter(
        (experiencia_id) =>
          !experienciaLaboral.some(
            (e) => e.id_experiencia_laboral === experiencia_id
          )
      );

      const experienciasAAgregar = experienciaLaboral.filter(
        (experiencia) =>
          !experienciasActualesIds.includes(experiencia.id_experiencia_laboral)
      );

      if (experienciasAEliminar.length > 0) {
        await prisma.experienciaLaboral.deleteMany({
          where: {
            persona_id: persona_id,
            id_experiencia_laboral: { in: experienciasAEliminar },
          },
        });
      }

      if (experienciasAAgregar.length > 0) {
        const nuevasExperiencias = experienciasAAgregar.map((experiencia) => {
          const { id_experiencia_laboral, ...nuevaExperiencia } = experiencia;
          return {
            persona_id: persona_id,
            ...nuevaExperiencia,
          };
        });

        await prisma.experienciaLaboral.createMany({
          data: nuevasExperiencias,
        });
      }

      const competenciasActuales = await prisma.personaCompetencia.findMany({
        where: { persona_id: persona_id },
        select: { competencia_id: true },
      });

      const competenciasActualesIds = competenciasActuales.map(
        (c) => c.competencia_id
      );

      const competenciasAEliminar = competenciasActualesIds.filter(
        (competencia_id) => !competencias.includes(competencia_id)
      );

      const competenciasAAgregar = competencias.filter(
        (competencia_id: number) =>
          !competenciasActualesIds.includes(competencia_id)
      );

      if (competenciasAEliminar.length > 0) {
        await prisma.personaCompetencia.deleteMany({
          where: {
            persona_id: persona_id,
            competencia_id: { in: competenciasAEliminar },
          },
        });
      }

      if (competenciasAAgregar.length > 0) {
        const nuevasCompetencias = competenciasAAgregar.map(
          (competencia_id: number) => ({
            persona_id: persona_id,
            competencia_id,
          })
        );
        await prisma.personaCompetencia.createMany({
          data: nuevasCompetencias,
        });
      }

      const idiomasActuales = await prisma.personaIdioma.findMany({
        where: { persona_id: persona_id },
        select: { idioma_id: true },
      });

      const idiomasActualesIds = idiomasActuales.map((i) => i.idioma_id);

      const idiomasAEliminar = idiomasActualesIds.filter(
        (idioma_id) => !idiomas.includes(idioma_id)
      );

      const idiomasAAgregar = idiomas.filter(
        (idioma_id: number) => !idiomasActualesIds.includes(idioma_id)
      );

      if (idiomasAEliminar.length > 0) {
        await prisma.personaIdioma.deleteMany({
          where: {
            persona_id: persona_id,
            idioma_id: { in: idiomasAEliminar },
          },
        });
      }

      if (idiomasAAgregar.length > 0) {
        const nuevosIdiomas = idiomasAAgregar.map((idioma_id: number) => ({
          persona_id: persona_id,
          idioma_id,
        }));
        await prisma.personaIdioma.createMany({
          data: nuevosIdiomas,
        });
      }

      const personaDb = await prisma.persona.update({
        where: {
          id_persona: persona_id,
        },
        data: {
          cedula: cedula,
          nombre: nombre,
        },
      });

      res.json(personaDb);
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
