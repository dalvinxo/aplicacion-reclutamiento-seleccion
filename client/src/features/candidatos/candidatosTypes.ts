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
