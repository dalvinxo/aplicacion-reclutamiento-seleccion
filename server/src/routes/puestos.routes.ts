import express from "express";

import { prisma } from "../libs/prisma";
import { EnumHttpCode, EnumRoles } from "../types";
import { authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { page, limit } = req.query;

  const pages = Number(page || 1);
  const limits = Number(limit || 10);

  const skip = (pages - 1) * limits;
  const take = limits;

  try {
    const puestos = await prisma.puesto.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id_puesto: "desc",
      },
      include: {
        Departamento: {
          select: {
            id_departamento: true,
            nombre: true,
          },
        },
      },
    });

    const totalPuestos = await prisma.puesto.count();
    const totalPages = Math.ceil(totalPuestos / take);

    const puestosPages = puestos.map((puesto) => {
      const { departamento_id, Departamento, ...puestoFilter } = puesto;

      return { ...puestoFilter, departamento: Departamento.nombre };
    });

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: totalPuestos,
      puestos: puestosPages,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/vacantes", async (req, res, next) => {
  const { page, limit } = req.query;

  const pages = Number(page || 1);
  const limits = Number(limit || 10);

  const skip = (pages - 1) * limits;
  const take = limits;

  try {
    const puestos = await prisma.puesto.findMany({
      skip: skip,
      take: take,

      where: {
        estado: true,
      },
      orderBy: {
        id_puesto: "desc",
      },
      include: {
        _count: {
          select: {
            Candidato: {
              where: {
                estado: true,
              },
            },
          },
        },
        Departamento: {
          select: {
            id_departamento: true,
            nombre: true,
          },
        },
      },
    });

    const totalPuestos = await prisma.puesto.count({
      where: {
        estado: true,
      },
    });

    const totalPages = Math.ceil(totalPuestos / take);

    const puestosPages = puestos.map((puesto) => {
      const { departamento_id, estado, _count, ...puestoFilter } = puesto;
      return { ...puestoFilter, candidatos: _count.Candidato };
    });

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: totalPuestos,
      puestos: puestosPages,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authorize([EnumRoles.USER, EnumRoles.ADMIN]),
  async (req, res, next) => {
    const {
      nombre,
      descripcion,
      nivel_riesgo,
      nivel_minimo_salario,
      nivel_maximo_salario,
      departamento_id,
      competencias,
      idiomas,
    } = req.body;

    try {
      const puesto = await prisma.puesto.create({
        data: {
          nombre,
          descripcion,
          nivel_riesgo,
          nivel_minimo_salario,
          nivel_maximo_salario,
          departamento_id,
        },
      });

      const puestoCompetencias = competencias.map((competencia_id: number) => {
        return {
          puesto_id: puesto.id_puesto,
          competencia_id,
        };
      });

      // Insertar todas las competencias en batch
      await prisma.puestoCompetencia.createMany({
        data: puestoCompetencias,
      });

      const puestoIdiomas = idiomas.map((idioma_id: number) => {
        return {
          puesto_id: puesto.id_puesto,
          idioma_id,
        };
      });

      // Insertar todos los idiomas en batch
      await prisma.puestoIdioma.createMany({
        data: puestoIdiomas,
      });

      res.status(EnumHttpCode.CREATED).json(puesto);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/multiples",
  authorize([EnumRoles.USER, EnumRoles.ADMIN]),
  async (req, res, next) => {
    try {
      const puestos = await prisma.puesto.createMany({
        data: req.body,
      });

      res.status(EnumHttpCode.CREATED).json(puestos);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const puesto = await prisma.puesto.findUnique({
      where: {
        id_puesto: Number(req.params.id),
      },
      select: {
        departamento_id: true,
        descripcion: true,
        id_puesto: true,
        estado: true,
        nivel_maximo_salario: true,
        nivel_minimo_salario: true,
        nivel_riesgo: true,
        nombre: true,
        PuestoIdioma: {
          select: {
            idioma_id: true,
          },
        },
        PuestoCompetencia: {
          select: {
            competencia_id: true,
          },
        },
      },
    });

    if (!puesto) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El puesto no existe" });
      return;
    }

    const { PuestoCompetencia, PuestoIdioma, ...data } = puesto;

    const puestoFilter = {
      ...data,
      idiomas: PuestoIdioma.map((idioma) => idioma.idioma_id),
      competencias: PuestoCompetencia.map(
        (competencia) => competencia.competencia_id
      ),
    };

    res.json(puestoFilter);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/candidatos", async (req, res, next) => {
  const { page, limit } = req.query;

  const pages = Number(page || 1);
  const limits = Number(limit || 10);

  const skip = (pages - 1) * limits;
  const take = limits;

  try {
    const puesto = await prisma.puesto.findUnique({
      where: {
        id_puesto: Number(req.params.id),
      },
      select: {
        _count: true,
        Candidato: {
          skip: skip,
          take: take,
          where: {
            estado: true,
          },
          select: {
            id_candidato: true,
            salario_aspirado: true,
            estado: true,
            estado_candidato_id: true,
            Persona: {
              select: {
                nombre: true,
                cedula: true,
              },
            },
            EstadoCandidato: {
              select: {
                descripcion: true,
              },
            },
            recomendado_por: true,
          },
        },
      },
    });

    if (!puesto) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El puesto no existe" });
      return;
    }

    const { Candidato, _count } = puesto;

    const candidatos_puestos = Candidato.map((postulante) => {
      const { Persona, EstadoCandidato, ...candidato } = postulante;

      return {
        ...candidato,
        nombre: Persona.nombre,
        cedula: Persona.cedula,
        estado_candidato: EstadoCandidato.descripcion,
      };
    });

    const totalPages = Math.ceil(_count.Candidato / take);

    res.json({
      page: pages,
      limit: limits,
      totalPages: totalPages,
      total: _count.Candidato,
      candidatos_puestos,
    });
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
        _count: {
          select: {
            Candidato: {
              where: {
                estado: true,
              },
            },
          },
        },
        PuestoIdioma: {
          select: {
            id_puesto_idioma: true,
            Idioma: {
              select: {
                nombre: true,
              },
            },
          },
        },
        PuestoCompetencia: {
          select: {
            id_puesto_competencia: true,
            Competencia: {
              select: {
                id_competencia: true,
                descripcion: true,
              },
            },
          },
        },
        Departamento: {
          select: {
            id_departamento: true,
            nombre: true,
          },
        },
      },
    });

    if (!puesto) {
      res
        .status(EnumHttpCode.NOT_FOUND)
        .json({ message: "El puesto consultado no existe" });
      return;
    }

    const puestoConCompetenciaYIdioma = {
      ...puesto,
      _count: puesto._count.Candidato,
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
  const { id } = req.params;

  const { competencias, idiomas, ...data } = req.body;

  const id_puesto = Number(id);

  try {
    const puesto = await prisma.puesto.update({
      where: {
        id_puesto,
      },
      data: data,
    });

    const competenciasActuales = await prisma.puestoCompetencia.findMany({
      where: { puesto_id: id_puesto },
      select: { competencia_id: true },
    });

    const competenciasActualesIds = competenciasActuales.map(
      (c) => c.competencia_id
    );

    const competenciasAEliminar = competenciasActualesIds.filter(
      (competencia_id) => !competencias.includes(competencia_id)
    );

    if (competenciasAEliminar.length > 0) {
      await prisma.puestoCompetencia.deleteMany({
        where: {
          puesto_id: id_puesto,
          competencia_id: { in: competenciasAEliminar },
        },
      });
    }

    const competenciasAAgregar = competencias.filter(
      (competencia_id: number) =>
        !competenciasActualesIds.includes(competencia_id)
    );

    if (competenciasAAgregar.length > 0) {
      const nuevasCompetencias = competenciasAAgregar.map(
        (competencia_id: number) => ({
          puesto_id: id_puesto,
          competencia_id,
        })
      );
      await prisma.puestoCompetencia.createMany({
        data: nuevasCompetencias,
      });
    }

    const idiomasActuales = await prisma.puestoIdioma.findMany({
      where: { puesto_id: id_puesto },
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
      await prisma.puestoIdioma.deleteMany({
        where: {
          puesto_id: id_puesto,
          idioma_id: { in: idiomasAEliminar },
        },
      });
    }

    if (idiomasAAgregar.length > 0) {
      const nuevosIdiomas = idiomasAAgregar.map((idioma_id: number) => ({
        puesto_id: id_puesto,
        idioma_id,
      }));
      await prisma.puestoIdioma.createMany({
        data: nuevosIdiomas,
      });
    }

    res.json(puesto);
  } catch (error) {
    next(error);
  }
});

export default router;
