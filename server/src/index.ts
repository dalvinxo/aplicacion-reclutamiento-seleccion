import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes";
import formRouter from "./routes/forms.routes";
import usuariosRouter from "./routes/usuarios.routes";

import empleadosRouter from "./routes/empleados.routes";
import rolesRouter from "./routes/roles.routes";
import puestosRouter from "./routes/puestos.routes";
import idiomasRouter from "./routes/idiomas.routes";
import competenciasRouter from "./routes/competencias.routes";
import departamentosRouter from "./routes/departamentos.routes";
import puestosIdiomasRouter from "./routes/puestosIdiomas.routes";
import puestosCompetenciasRouter from "./routes/puestosCompetencias.routes";
import personasRouter from "./routes/personas.routes";
import candidatosRouter from "./routes/candidatos.routes";
import capacitacionesRouter from "./routes/capacitaciones.routes";
import estadosCandidatos from "./routes/estadosCandidatos.routes";
import personasIdiomasRouter from "./routes/personasIdiomas.routes";
import experienciasLaboralesRouter from "./routes/experienciasLaborales.routes";
import personasCompetenciasRouter from "./routes/personasCompetencias.routes";

import { authorize } from "./middleware/auth.middleware";

import { PORT } from "./utils/config";

import { EnumRoles } from "./types";

const app = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser());

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.send("pong");
});

app.use("/api/auth", authRouter);

app.use("/api/form", formRouter);

app.use("/api/puestos", puestosRouter);

app.use("/api/candidatos", candidatosRouter);

app.use(authorize([EnumRoles.USER, EnumRoles.ADMIN]));
app.use("/api/personas", personasRouter);
app.use("/api/capacitaciones", capacitacionesRouter);
app.use("/api/personasIdiomas", personasIdiomasRouter);
app.use("/api/experienciasLaborales", experienciasLaboralesRouter);
app.use("/api/personasCompetencias", personasCompetenciasRouter);
app.use("/api/empleados", empleadosRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/idiomas", idiomasRouter);
app.use("/api/departamentos", departamentosRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/competencias", competenciasRouter);
app.use("/api/puestosIdiomas", puestosIdiomasRouter);
app.use("/api/puestosCompetencias", puestosCompetenciasRouter);
app.use("/api/estadosCandidatos", estadosCandidatos);

app.use(authorize([EnumRoles.ADMIN]));
app.use("/api/usuarios", usuariosRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
