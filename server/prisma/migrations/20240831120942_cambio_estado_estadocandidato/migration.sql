/*
  Warnings:

  - You are about to drop the `Estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `estado_id` on the `Candidato` table. All the data in the column will be lost.
  - Added the required column `estado_candidato_id` to the `Candidato` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Estado_descripcion_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estado";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "EstadoCandidato" (
    "id_estado_candidato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
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
    "estado_candidato_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Candidato_puesto_aspirado_id_fkey" FOREIGN KEY ("puesto_aspirado_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_estado_candidato_id_fkey" FOREIGN KEY ("estado_candidato_id") REFERENCES "EstadoCandidato" ("id_estado_candidato") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "Departamento" ("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Candidato" ("departamento_id", "estado", "id_candidato", "persona_id", "puesto_aspirado_id", "recomendado_por", "salario_aspirado") SELECT "departamento_id", "estado", "id_candidato", "persona_id", "puesto_aspirado_id", "recomendado_por", "salario_aspirado" FROM "Candidato";
DROP TABLE "Candidato";
ALTER TABLE "new_Candidato" RENAME TO "Candidato";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "EstadoCandidato_descripcion_key" ON "EstadoCandidato"("descripcion");
