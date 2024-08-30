/*
  Warnings:

  - You are about to drop the column `departamento` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `candidato_id` on the `Empleado` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `departamento_id` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento_id` to the `Empleado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Departamento" (
    "id_departamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidato" (
    "id_candidato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "puesto_aspirado_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,
    "salario_aspirado" REAL NOT NULL DEFAULT 0.0,
    "recomendado_por" TEXT NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Candidato_puesto_aspirado_id_fkey" FOREIGN KEY ("puesto_aspirado_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado" ("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "Departamento" ("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Candidato" ("cedula", "estado", "estado_id", "id_candidato", "nombre", "puesto_aspirado_id", "recomendado_por", "salario_aspirado") SELECT "cedula", "estado", "estado_id", "id_candidato", "nombre", "puesto_aspirado_id", "recomendado_por", "salario_aspirado" FROM "Candidato";
DROP TABLE "Candidato";
ALTER TABLE "new_Candidato" RENAME TO "Candidato";
CREATE UNIQUE INDEX "Candidato_cedula_key" ON "Candidato"("cedula");
CREATE TABLE "new_Empleado" (
    "id_empleado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_ingreso" DATETIME NOT NULL,
    "departamento" TEXT NOT NULL,
    "puesto_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,
    "salario_mensual" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Empleado_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Empleado_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "Departamento" ("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Empleado" ("cedula", "departamento", "estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "nombre", "puesto_id", "salario_mensual") SELECT "cedula", "departamento", "estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "nombre", "puesto_id", "salario_mensual" FROM "Empleado";
DROP TABLE "Empleado";
ALTER TABLE "new_Empleado" RENAME TO "Empleado";
CREATE TABLE "new_Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empleado_id" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Usuario_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "Empleado" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol" ("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("empleado_id", "estado", "id_usuario", "password", "rol_id") SELECT "empleado_id", "estado", "id_usuario", "password", "rol_id" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
