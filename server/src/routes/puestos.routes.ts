import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode } from "../types";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const puestos = await prisma.puesto.findMany();
    res.json(puestos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.create({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(puesto);
  } catch (error) {
    next(error);
  }
});

router.post("/multiples", async (req, res, next) => {
  try {
    const puestos = await prisma.puesto.createMany({
      data: req.body,
    });

    res.status(EnumHttpCode.CREATED).json(puestos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.findUnique({
      where: {
        id_puesto: Number(req.params.id),
      },
    });

    if (!puesto) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El idioma no existe" });
      return;
    }

    res.json(puesto);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/competenciasYIdiomas", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.findUnique({
      where: {
        id_puesto: Number(req.params.id),
      },
      select: {
        id_puesto: true,
        nombre: true,
        descripcion: true,
        nivel_riesgo: true,
        nivel_minimo_salario: true,
        nivel_maximo_salario: true,
        PuestoIdioma: {
          select: {
            Idioma: {
              select: {
                nombre: true,
              },
            },
          },
        },
        PuestoCompetencia: {
          select: {
            Competencia: {
              select: {
                descripcion: true,
              },
            },
          },
        },
      },
    });

    if (!puesto) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El idioma no existe" });
      return;
    }

    const puestoConCompetenciaYIdioma = {
      ...puesto,
      PuestoIdioma: puesto.PuestoIdioma.map((idiomas) => idiomas.Idioma.nombre),
      PuestoCompetencia: puesto.PuestoCompetencia.map(
        (competencias) => competencias.Competencia.descripcion
      ),
    };

    res.json(puestoConCompetenciaYIdioma);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.puesto.delete({
      where: {
        id_puesto: Number(req.params.id),
      },
    });

    res.status(EnumHttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.update({
      where: {
        id_puesto: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(puesto);
  } catch (error) {
    next(error);
  }
});

export default router;
