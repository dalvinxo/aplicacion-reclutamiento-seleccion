-- CreateTable
CREATE TABLE "UsuarioPersona" (
    "id_usuario_persona" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "persona_id" INTEGER NOT NULL,
    CONSTRAINT "UsuarioPersona_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "Persona" ("id_persona") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsuarioPersona_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
