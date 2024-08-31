/*
  Warnings:

  - You are about to drop the `CandidatoCompetencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cedula` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `candidato_id` on the `Capacitacion` table. All the data in the column will be lost.
  - You are about to drop the column `cedula` on the `Empleado` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Empleado` table. All the data in the column will be lost.
  - You are about to drop the column `candidato_id` on the `ExperienciaLaboral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descripcion]` on the table `Competencia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Departamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descripcion]` on the table `Estado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Idioma` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `persona_id` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persona_id` to the `Capacitacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persona_id` to the `Empleado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persona_id` to the `ExperienciaLaboral` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CandidatoCompetencia";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PersonaIdioma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "idioma_id" INTEGER NOT NULL,
    CONSTRAINT "PersonaIdioma_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PersonaIdioma_idioma_id_fkey" FOREIGN KEY ("idioma_id") REFERENCES "Idioma" ("id_idioma") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonaCompetencia" (
    "id_puesto_competencia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "competencia_id" INTEGER NOT NULL,
    CONSTRAINT "PersonaCompetencia_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PersonaCompetencia_competencia_id_fkey" FOREIGN KEY ("competencia_id") REFERENCES "Competencia" ("id_competencia") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Persona" (
    "id_persona" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidato" (
    "id_candidato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "puesto_aspirado_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,
    "salario_aspirado" REAL NOT NULL DEFAULT 0.0,
    "recomendado_por" TEXT NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Candidato_puesto_aspirado_id_fkey" FOREIGN KEY ("puesto_aspirado_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado" ("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "Departamento" ("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Candidato" ("departamento_id", "estado", "estado_id", "id_candidato", "puesto_aspirado_id", "recomendado_por", "salario_aspirado") SELECT "departamento_id", "estado", "estado_id", "id_candidato", "puesto_aspirado_id", "recomendado_por", "salario_aspirado" FROM "Candidato";
DROP TABLE "Candidato";
ALTER TABLE "new_Candidato" RENAME TO "Candidato";
CREATE TABLE "new_Capacitacion" (
    "id_capacitacion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "fecha_desde" DATETIME NOT NULL,
    "fecha_hasta" DATETIME NOT NULL,
    "institucion" TEXT NOT NULL,
    CONSTRAINT "Capacitacion_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Capacitacion" ("descripcion", "fecha_desde", "fecha_hasta", "id_capacitacion", "institucion", "nivel") SELECT "descripcion", "fecha_desde", "fecha_hasta", "id_capacitacion", "institucion", "nivel" FROM "Capacitacion";
DROP TABLE "Capacitacion";
ALTER TABLE "new_Capacitacion" RENAME TO "Capacitacion";
CREATE TABLE "new_Empleado" (
    "id_empleado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "fecha_ingreso" DATETIME NOT NULL,
    "puesto_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,
    "salario_mensual" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Empleado_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Empleado_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Empleado_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "Departamento" ("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Empleado" ("departamento_id", "estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "puesto_id", "salario_mensual") SELECT "departamento_id", "estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "puesto_id", "salario_mensual" FROM "Empleado";
DROP TABLE "Empleado";
ALTER TABLE "new_Empleado" RENAME TO "Empleado";
CREATE TABLE "new_ExperienciaLaboral" (
    "id_experiencia_laboral" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "puesto_ocupado" TEXT NOT NULL,
    "fecha_desde" DATETIME NOT NULL,
    "fecha_hasta" DATETIME NOT NULL,
    "salario" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "ExperienciaLaboral_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExperienciaLaboral" ("empresa", "fecha_desde", "fecha_hasta", "id_experiencia_laboral", "puesto_ocupado", "salario") SELECT "empresa", "fecha_desde", "fecha_hasta", "id_experiencia_laboral", "puesto_ocupado", "salario" FROM "ExperienciaLaboral";
DROP TABLE "ExperienciaLaboral";
ALTER TABLE "new_ExperienciaLaboral" RENAME TO "ExperienciaLaboral";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Persona_cedula_key" ON "Persona"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Competencia_descripcion_key" ON "Competencia"("descripcion");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_nombre_key" ON "Departamento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_descripcion_key" ON "Estado"("descripcion");

-- CreateIndex
CREATE UNIQUE INDEX "Idioma_nombre_key" ON "Idioma"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_user_key" ON "Usuario"("user");
