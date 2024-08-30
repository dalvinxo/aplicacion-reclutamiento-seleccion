-- CreateTable
CREATE TABLE "Competencia" (
    "id_competencia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Idioma" (
    "id_idioma" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Capacitacion" (
    "id_capacitacion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "candidato_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "fecha_desde" DATETIME NOT NULL,
    "fecha_hasta" DATETIME NOT NULL,
    "institucion" TEXT NOT NULL,
    CONSTRAINT "Capacitacion_candidato_id_fkey" FOREIGN KEY ("candidato_id") REFERENCES "Candidato" ("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Puesto" (
    "id_puesto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "nivel_riesgo" TEXT NOT NULL,
    "nivel_minimo_salario" REAL NOT NULL DEFAULT 0.0,
    "nivel_maximo_salario" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "PuestoCompetencia" (
    "id_puesto_competencia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "puesto_id" INTEGER NOT NULL,
    "competencia_id" INTEGER NOT NULL,
    CONSTRAINT "PuestoCompetencia_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PuestoCompetencia_competencia_id_fkey" FOREIGN KEY ("competencia_id") REFERENCES "Competencia" ("id_competencia") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PuestoIdioma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "puesto_id" INTEGER NOT NULL,
    "idioma_id" INTEGER NOT NULL,
    CONSTRAINT "PuestoIdioma_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PuestoIdioma_idioma_id_fkey" FOREIGN KEY ("idioma_id") REFERENCES "Idioma" ("id_idioma") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Candidato" (
    "id_candidato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "puesto_aspirado_id" INTEGER NOT NULL,
    "departamento" TEXT NOT NULL,
    "salario_aspirado" REAL NOT NULL DEFAULT 0.0,
    "recomendado_por" TEXT NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Candidato_puesto_aspirado_id_fkey" FOREIGN KEY ("puesto_aspirado_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidato_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado" ("id_estado") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CandidatoCompetencia" (
    "id_puesto_competencia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "candidato_id" INTEGER NOT NULL,
    "competencia_id" INTEGER NOT NULL,
    CONSTRAINT "CandidatoCompetencia_candidato_id_fkey" FOREIGN KEY ("candidato_id") REFERENCES "Candidato" ("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CandidatoCompetencia_competencia_id_fkey" FOREIGN KEY ("competencia_id") REFERENCES "Competencia" ("id_competencia") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExperienciaLaboral" (
    "id_experiencia_laboral" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "candidato_id" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "puesto_ocupado" TEXT NOT NULL,
    "fecha_desde" DATETIME NOT NULL,
    "fecha_hasta" DATETIME NOT NULL,
    "salario" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "ExperienciaLaboral_candidato_id_fkey" FOREIGN KEY ("candidato_id") REFERENCES "Candidato" ("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Empleado" (
    "id_empleado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_ingreso" DATETIME NOT NULL,
    "departamento" TEXT NOT NULL,
    "puesto_id" INTEGER NOT NULL,
    "candidato_id" INTEGER NOT NULL,
    "salario_mensual" REAL NOT NULL DEFAULT 0.0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Empleado_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "Puesto" ("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Empleado_candidato_id_fkey" FOREIGN KEY ("candidato_id") REFERENCES "Candidato" ("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empleado_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol_id" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Usuario_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "Empleado" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol" ("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rol" (
    "id_rol" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Estado" (
    "id_estado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "Puesto_nombre_key" ON "Puesto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_cedula_key" ON "Candidato"("cedula");
