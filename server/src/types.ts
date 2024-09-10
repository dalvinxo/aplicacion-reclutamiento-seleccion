import { Request } from "express";

export enum EnumHttpCode {
  OK = 200,
  NOT_FOUND = 404,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZE = 401,
  NO_CONTENT = 204,
  INTERNAL_SERVER_ERROR = 500,
}

export enum EnumRoles {
  ADMIN = 1,
  USER = 2,
  CANDIDATE = 4,
}

export interface RequestCustom<T> extends Request {
  user: T;
}

export interface PayloadJwt {
  usuario_id: number;
  empleado_id: number;
  rol: number;
}

export enum EnumStatusCandidato {
  POSTULADO = 1,
  CONTRADO = 2,
}

export interface ICapacitaciones {
  descripcion: string;
  nivel: string;
  fecha_desde: string;
  fecha_hasta: string;
  institucion: string;
}

export interface IExperienciaLaboral {
  empresa: string;
  puesto_ocupado: string;
  fecha_desde: string;
  fecha_hasta: string;
  salario: number;
}

export interface ICreatePerson {
  cedula: string;
  nombre: string;
  idiomas?: number[];
  competencias?: number[];
  capacitaciones?: ICapacitaciones[];
  experienciaLaboral?: IExperienciaLaboral[];
}

interface ICapacitacionUpdate extends ICapacitaciones {
  capacitacion_id: number;
}

interface IExperienciaLaboralUpdate extends IExperienciaLaboral {
  id_experiencia_laboral: number;
}

export interface IUpdatePerson {
  cedula: string;
  nombre: string;
  idiomas?: number[];
  competencias?: number[];
  capacitaciones?: ICapacitacionUpdate[];
  experienciaLaboral?: IExperienciaLaboralUpdate[];
}

export interface IUpdateCandidato {
  puesto_aspirado_id: number;
  departamento_id: number;
  salario_aspirado: number;
  recomendado_por: string;
  estado_candidato_id: number;
  persona: IUpdatePerson;
}

export interface ICreateCandidato {
  puesto_aspirado_id: number;
  departamento_id: number;
  salario_aspirado: number;
  recomendado_por: string;
  estado_candidato_id: number;
  persona: ICreatePerson;
}

export type IPerson = Pick<ICreatePerson, "cedula" | "nombre">;
