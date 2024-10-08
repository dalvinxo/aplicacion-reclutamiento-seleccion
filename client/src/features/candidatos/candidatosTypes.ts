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

export interface ICandidatoContrato {
  id_empleado: number;
  persona_id: number;
  fecha_ingreso: string;
  puesto_id: number;
  salario_mensual: number;
  estado: boolean;
  fecha_creacion: string;
  Persona: {
    id_persona: number;
    cedula: string;
    nombre: string;
    estado: boolean;
  };
}

export enum EnumStatusCandidato {
  POSTULADO = 1,
  CONTRADO = 2,
}

export interface CandidatosFilters extends IPagination {
  candidatos: CandidatosPostulados[];
}

export interface CandidatosPostulados {
  candidato_estado: string;
  cedula: string;
  departamento: string;
  estado: boolean;
  estado_candidato_id: number;
  id_candidato: number;
  nombre: string;
  puesto: string;
  puesto_aspirado_id: number;
  recomendado_por: string;
  salario_aspirado: number;
}
