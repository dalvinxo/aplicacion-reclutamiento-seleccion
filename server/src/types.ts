export enum EnumHttpCode {
  OK = 200,
  NOT_FOUND = 404,
  CREATED = 201,
  BAD_REQUEST = 401,
  NO_CONTENT = 204,
  ERROR_SERVER = 500,
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
  idiomas?: { idioma_id: number }[];
  competencias?: { competencia_id: number }[];
  capacitaciones?: ICapacitaciones[];
  experienciaLaboral?: IExperienciaLaboral[];
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
