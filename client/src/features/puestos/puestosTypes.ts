export interface Vacantes extends IPagination {
  puestos: PuestoVacante[];
}

export interface Puestos extends IPagination {
  puestos: Puesto[];
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
};

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

export type PutPuesto = Partial<Omit<RootPuesto, 'id_puesto'>> & {
  id_puesto: number;
};
