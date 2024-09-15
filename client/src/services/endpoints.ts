export const endpoints = {
  auth: {
    login: 'auth/login',
    signup: 'auth/sign-up',
    logout: 'auth/logout',
    user: 'auth/user',
    userPerson: 'auth/user-person',
    userCandidate: (id: number) => `auth/${id}`,
  },
  empleados: {
    getAll: (pages: number = 1, limit = 10) =>
      `empleados?page=${pages}&limit=${limit}`,
    getAllFilter: (
      pages: number = 1,
      limit = 10,
      desde?: string,
      hasta?: string
    ) =>
      `empleados/filtrar?page=${pages}&limit=${limit}${!!desde ? '&desde=' + desde : ''}${!!hasta ? '&hasta=' + hasta : ''}`,
  },
  puestos: {
    getAll: (pages: number = 1, limit = 10) =>
      `puestos?page=${pages}&limit=${limit}`,
    getAllVacantes: (pages: number = 1, limit = 10) =>
      `puestos/vacantes?page=${pages}&limit=${limit}`,
    getAllCandidatos: (puesto_id: number, pages: number = 1, limit = 10) =>
      `puestos/${puesto_id}/candidatos?page=${pages}&limit=${limit}`,
    getOne: (id: number) => `puestos/${id}`,
    getOneDetails: (id: number) => `puestos/${id}/competenciasYIdiomas`,
    update: (id: number) => `puestos/${id}`,
    create: `puestos/`,
  },
  candidatos: {
    create: `candidatos/detalles`,
    update: (id: number) => `candidatos/detalles/${id}`,
    getOneDetails: (id: number) => `candidatos/${id}/details`,
    contratar: (id: number) => `candidatos/${id}/contratar`,
    getAllFilter: (
      pages: number = 1,
      limit = 10,
      puesto_id?: number,
      competencia_id?: number,
      idioma_id?: number,
      nivel_capacitacion?: string
    ) =>
      `candidatos/filtrar?page=${pages}&limit=${limit}${!!competencia_id ? '&competencia_id=' + competencia_id : ''}${!!idioma_id ? '&idioma_id=' + idioma_id : ''}${!!puesto_id ? '&puesto_id=' + puesto_id : ''}${!!nivel_capacitacion ? '&nivel_capacitacion=' + nivel_capacitacion : ''}`,
  },
  competencias: {
    getAll: (pages: number = 1, limit = 10) =>
      `competencias?page=${pages}&limit=${limit}`,
    getOne: (id: number) => `competencias/${id}`,
    update: (id: number) => `competencias/${id}`,
    delete: (id: number) => `competencias/${id}`,
    create: `competencias/`,
    createMultiples: `competencias/multiples`,
  },
  idiomas: {
    getAll: (pages: number = 1, limit = 10) =>
      `idiomas?page=${pages}&limit=${limit}`,
    getOne: (id: number) => `idiomas/${id}`,
    update: (id: number) => `idiomas/${id}`,
    delete: (id: number) => `idiomas/${id}`,
    create: `idiomas/`,
    createMultiples: `idiomas/multiples`,
  },
  form: {
    getFormCrearCandidato: `form/crear-candidatos`,
    getFormCrearPuesto: `form/crear-puestos`,
    getFormSearchCandidato: `form/filter-candidates`,
  },
};
