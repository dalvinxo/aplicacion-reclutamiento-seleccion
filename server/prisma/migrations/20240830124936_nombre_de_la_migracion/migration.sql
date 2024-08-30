/*
  Warnings:

  - You are about to drop the column `departamento` on the `Empleado` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empleado" (
    "id_empleado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_ingreso" DATETIME NOT NULL,
    "puesto_id" INTEGER NOT NULL,
    "departamento_id" INTEGER NOT NULL,
    "salario_mensual" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Empleado_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Empleado_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "Departamento" ("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Empleado" ("cedula", "departamento_id", "estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "nombre", "puesto_id", "salario_mensual") SELECT "cedula", "departamento_id", "estado", "fecha_creacion", "fecha_ingreso", "id_empleado", "nombre", "puesto_id", "salario_mensual" FROM "Empleado";
DROP TABLE "Empleado";
ALTER TABLE "new_Empleado" RENAME TO "Empleado";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
