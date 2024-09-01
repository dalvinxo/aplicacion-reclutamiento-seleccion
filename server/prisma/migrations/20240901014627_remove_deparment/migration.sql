/*
  Warnings:

  - You are about to drop the column `departamento_id` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `departamento_id` on the `Empleado` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidato" (
    "id_candidato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "puesto_aspirado_id" INTEGER NOT NULL,
    "salario_aspirado" REAL NOT NULL DEFAULT 0.0,
    "recomendado_por" TEXT NOT NULL,
    "estado_candidato_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Candidato_puesto_aspirado_id_fkey" FOREIGN KEY ("puesto_aspirado_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_estado_candidato_id_fkey" FOREIGN KEY ("estado_candidato_id") REFERENCES "EstadoCandidato" ("id_estado_candidato") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Candidato" ("estado", "estado_candidato_id", "id_candidato", "persona_id", "puesto_aspirado_id", "recomendado_por", "salario_aspirado") SELECT "estado", "estado_candidato_id", "id_candidato", "persona_id", "puesto_aspirado_id", "recomendado_por", "salario_aspirado" FROM "Candidato";
DROP TABLE "Candidato";
ALTER TABLE "new_Candidato" RENAME TO "Candidato";
CREATE TABLE "new_Empleado" (
    "id_empleado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "fecha_ingreso" DATETIME NOT NULL,
    "puesto_id" INTEGER NOT NULL,
    "salario_mensual" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Empleado_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Empleado_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Empleado" ("estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "persona_id", "puesto_id", "salario_mensual") SELECT "estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "persona_id", "puesto_id", "salario_mensual" FROM "Empleado";
DROP TABLE "Empleado";
ALTER TABLE "new_Empleado" RENAME TO "Empleado";
CREATE TABLE "new_Puesto" (
    "id_puesto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departamento_id" INTEGER NOT NULL DEFAULT 1,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel_riesgo" TEXT NOT NULL,
    "nivel_minimo_salario" REAL NOT NULL DEFAULT 0.0,
    "nivel_maximo_salario" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Puesto_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "Departamento" ("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Puesto" ("descripcion", "estado", "id_puesto", "nivel_maximo_salario", "nivel_minimo_salario", "nivel_riesgo", "nombre") SELECT "descripcion", "estado", "id_puesto", "nivel_maximo_salario", "nivel_minimo_salario", "nivel_riesgo", "nombre" FROM "Puesto";
DROP TABLE "Puesto";
ALTER TABLE "new_Puesto" RENAME TO "Puesto";
CREATE UNIQUE INDEX "Puesto_nombre_key" ON "Puesto"("nombre");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
