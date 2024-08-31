/*
  Warnings:

  - Added the required column `descripcion` to the `Puesto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Puesto" (
    "id_puesto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel_riesgo" TEXT NOT NULL,
    "nivel_minimo_salario" REAL NOT NULL DEFAULT 0.0,
    "nivel_maximo_salario" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Puesto" ("estado", "id_puesto", "nivel_maximo_salario", "nivel_minimo_salario", "nivel_riesgo", "nombre") SELECT "estado", "id_puesto", "nivel_maximo_salario", "nivel_minimo_salario", "nivel_riesgo", "nombre" FROM "Puesto";
DROP TABLE "Puesto";
ALTER TABLE "new_Puesto" RENAME TO "Puesto";
CREATE UNIQUE INDEX "Puesto_nombre_key" ON "Puesto"("nombre");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
