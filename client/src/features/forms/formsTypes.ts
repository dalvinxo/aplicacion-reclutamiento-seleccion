export interface FormCrearCandidato {
  competencias: CompetenciaForm[];
  idiomas: IdiomaForm[];
}

export interface FormCrearPuesto extends FormCrearCandidato {
  departamentos: DepartamentoForm[];
}

export interface CompetenciaForm {
  descripcion: string;
  id_competencia: number;
}

export interface IdiomaForm {
  id_idioma: number;
  nombre: string;
}

export interface DepartamentoForm {
  id_departamento: number;
  nombre: string;
}
