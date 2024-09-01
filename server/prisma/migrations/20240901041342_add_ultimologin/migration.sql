/*
  Warnings:

  - Added the required column `ultimo_login` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empleado_id" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "ultimo_login" DATETIME NOT NULL,
    CONSTRAINT "Usuario_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "Empleado" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol" ("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("empleado_id", "estado", "id_usuario", "password", "rol_id", "user") SELECT "empleado_id", "estado", "id_usuario", "password", "rol_id", "user" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_user_key" ON "Usuario"("user");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
