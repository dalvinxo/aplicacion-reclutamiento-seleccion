import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const personas = await prisma.persona.findMany();
    res.json(personas);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const personas = await prisma.persona.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(personas);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const personas = await prisma.persona.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(personas);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const persona = await prisma.persona.findUnique({
      where: {
        id_persona: Number(req.params.id),
      },
    });

    if (!persona) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La persona no existe" });
      return;
    }

    res.json(persona);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/detalles", async (req, res, next) => {
  try {
    const persona = await prisma.persona.findUnique({
      where: {
        id_persona: Number(req.params.id),
      },
      include: {
        _count: true,
        Capacitacion: true,
        ExperienciaLaboral: true,
        PersonaCompetencia: {
          select: {
            id_persona_competencia: true,
            Competencia: {
              select: {
                descripcion: true,
              },
            },
          },
        },
        PersonaIdioma: {
          select: {
            id_persona_idioma: true,
            Idioma: {
              select: {
                nombre: true,
              },
            },
          },
        },
        Candidato: true,
        Empleado: true,
      },
    });

    if (!persona) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "La persona no existe" });
      return;
    }

    const PersonaDetalles = {
      ...persona,
      PersonaCompetencia: persona.PersonaCompetencia.map((competencia) => ({
        id_persona_competencia: competencia.id_persona_competencia,
        descripcion: competencia.Competencia.descripcion,
      })),
      PersonaIdioma: persona.PersonaIdioma.map((idioma) => ({
        id_persona_idioma: idioma.id_persona_idioma,
        nombre: idioma.Idioma.nombre,
      })),
    };

    res.json(PersonaDetalles);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.persona.delete({
      where: {
        id_persona: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const persona = await prisma.persona.update({
      where: {
        id_persona: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(persona);
  } catch (error) {
    next(error);
  }
});

export default router;
