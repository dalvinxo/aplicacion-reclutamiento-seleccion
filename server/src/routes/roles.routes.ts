import express from "express";
import { prisma } from "../libs/prisma";
const router = express.Router();

// router.get("/", (_req, res) => {
//   return res.json({ message: "Hello World" });
// });

router.get("/", async (_req, res, next) => {
  try {
    const roles = await prisma.rol.findMany({
      include: {
        Usuario: true,
      },
    });

    res.json(roles);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = await prisma.rol.create({
      data: req.body,
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const product = await prisma.rol.findUnique({
    where: {
      id_rol: Number(req.params.id),
    },
    include: {
      Usuario: true,
    },
  });
  res.json(product);
});

router.delete("/:id", async (req, res) => {
  await prisma.rol.delete({
    where: {
      id_rol: Number(req.params.id),
    },
  });

  res.status(204).json();
});

router.patch("/:id", async (req, res, next) => {
  try {
    const rol = await prisma.rol.update({
      where: {
        id_rol: Number(req.params.id),
      },
      data: req.body,
      include: {
        Usuario: true,
      },
    });
    res.json(rol);
  } catch (error) {
    next(error);
  }
});

export default router;
