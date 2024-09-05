export interface FormCrearCandidato {
  competencias: CompetenciaForm[];
  idiomas: IdiomaForm[];
}

export interface CompetenciaForm {
  descripcion: string;
  id_competencia: number;
}

export interface IdiomaForm {
  id_idioma: number;
  nombre: string;
}
