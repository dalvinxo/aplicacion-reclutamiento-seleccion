export interface ICreatePerson {
  cedula: string;
  nombre: string;
  idiomas: number[];
  competencias: number[];
  capacitaciones: ICapacitaciones[];
  experienciaLaboral: IExperienciaLaboral[];
}

export interface ICreateCandidato {
  puesto_aspirado_id: number;
  salario_aspirado: number;
  recomendado_por: string;
  persona: ICreatePerson;
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
  salario_aspirado: number;
  recomendado_por: string;
  persona: IUpdatePerson;
}

export interface ICapacitaciones {
  descripcion: string;
  nivel: string;
  fecha_desde: Date;
  fecha_hasta: Date;
  institucion: string;
}

export interface IExperienciaLaboral {
  fecha_desde: Date;
  fecha_hasta: Date;
  empresa: string;
  puesto_ocupado: string;
  salario: number;
}

export interface IPerson {
  cedula: string;
  estado: boolean;
  id_persona: number;
  nombre: string;
}

export enum EnumStatusCandidato {
  POSTULADO = 1,
  CONTRADO = 2,
}
