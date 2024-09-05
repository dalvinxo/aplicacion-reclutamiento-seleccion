export interface Competencias extends IPagination {
  competencias: Competencia[];
}

export interface Competencia {
  descripcion: string;
  estado: boolean;
  id_competencia: number;
}
