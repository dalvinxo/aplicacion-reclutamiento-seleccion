export interface Idiomas extends IPagination {
  idiomas: Idioma[];
}

export interface Idioma {
  estado: boolean;
  id_idioma: number;
  nombre: string;
}
