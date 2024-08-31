/*
  Warnings:

  - The primary key for the `PersonaCompetencia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_puesto_competencia` on the `PersonaCompetencia` table. All the data in the column will be lost.
  - The primary key for the `PersonaIdioma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PersonaIdioma` table. All the data in the column will be lost.
  - The primary key for the `PuestoIdioma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PuestoIdioma` table. All the data in the column will be lost.
  - Added the required column `id_persona_competencia` to the `PersonaCompetencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_persona_idioma` to the `PersonaIdioma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_puesto_idioma` to the `PuestoIdioma` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonaCompetencia" (
    "id_persona_competencia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "competencia_id" INTEGER NOT NULL,
    CONSTRAINT "PersonaCompetencia_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PersonaCompetencia_competencia_id_fkey" FOREIGN KEY ("competencia_id") REFERENCES "Competencia" ("id_competencia") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PersonaCompetencia" ("competencia_id", "persona_id") SELECT "competencia_id", "persona_id" FROM "PersonaCompetencia";
DROP TABLE "PersonaCompetencia";
ALTER TABLE "new_PersonaCompetencia" RENAME TO "PersonaCompetencia";
CREATE TABLE "new_PersonaIdioma" (
    "id_persona_idioma" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "idioma_id" INTEGER NOT NULL,
    CONSTRAINT "PersonaIdioma_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PersonaIdioma_idioma_id_fkey" FOREIGN KEY ("idioma_id") REFERENCES "Idioma" ("id_idioma") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PersonaIdioma" ("idioma_id", "persona_id") SELECT "idioma_id", "persona_id" FROM "PersonaIdioma";
DROP TABLE "PersonaIdioma";
ALTER TABLE "new_PersonaIdioma" RENAME TO "PersonaIdioma";
CREATE TABLE "new_PuestoIdioma" (
    "id_puesto_idioma" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "puesto_id" INTEGER NOT NULL,
    "idioma_id" INTEGER NOT NULL,
    CONSTRAINT "PuestoIdioma_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PuestoIdioma_idioma_id_fkey" FOREIGN KEY ("idioma_id") REFERENCES "Idioma" ("id_idioma") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PuestoIdioma" ("idioma_id", "puesto_id") SELECT "idioma_id", "puesto_id" FROM "PuestoIdioma";
DROP TABLE "PuestoIdioma";
ALTER TABLE "new_PuestoIdioma" RENAME TO "PuestoIdioma";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
