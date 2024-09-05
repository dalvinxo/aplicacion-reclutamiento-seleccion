export interface Puestos extends IPagination {
  puestos: Puesto[];
}

export interface Puesto {
  Departamento: Departamento;
  descripcion: string;
  id_puesto: number;
  nivel_maximo_salario: number;
  nivel_minimo_salario: number;
  nivel_riesgo: NivelRiesgo;
  nombre: string;
}

export interface PuestoDetails extends Puesto {
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
