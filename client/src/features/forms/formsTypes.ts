export interface FormCrearCandidato {
  competencias: Competencia[];
  idiomas: Idioma[];
}

export interface Competencia {
  descripcion: string;
  id_competencia: number;
}

export interface Idioma {
  id_idioma: number;
  nombre: string;
}
