export interface Vacantes extends IPagination {
  puestos: PuestoVacante[];
}

export interface Puestos extends IPagination {
  puestos: Puesto[];
}

export interface IPuestoCandidatos extends IPagination {
  candidatos_puestos: IRootPuestoCandidato[];
}

export interface IRootPuestoCandidato {
  id_candidato: number;
  cedula: string;
  estado: boolean;
  estado_candidato: string;
  estado_candidato_id: number;
  nombre: string;
  recomendado_por: string;
  salario_aspirado: number;
}

export interface RootPuesto {
  id_puesto: number;
  departamento_id: number;
  nombre: string;
  descripcion: string;
  nivel_riesgo: string;
  nivel_minimo_salario: number;
  nivel_maximo_salario: number;
  estado: boolean;
}

export interface Puesto extends Omit<RootPuesto, 'departamento_id'> {
  departamento: string;
}

export type PuestoVacante = Omit<Puesto, 'estado' | 'departamento'> & {
  Departamento: Departamento;
  candidatos: number;
};

export interface PuestoDetails extends PuestoVacante {
  PuestoCompetencia: string[];
  PuestoIdioma: string[];
  _count: number;
}

export interface Departamento {
  id_departamento: number;
  nombre: string;
}

export enum NivelRiesgo {
  Alto = 'Alto',
  Bajo = 'Bajo',
  Medio = 'Medio',
}

export interface PuestoIdiomaCompetencia {
  competencias: number[];
  departamento_id: number;
  descripcion: string;
  estado: boolean;
  id_puesto: number;
  idiomas: number[];
  nivel_maximo_salario: number;
  nivel_minimo_salario: number;
  nivel_riesgo: string;
  nombre: string;
}
