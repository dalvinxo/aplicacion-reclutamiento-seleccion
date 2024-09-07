export const endpoints = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    user: 'auth/user',
  },
  puestos: {
    getAll: (pages: number = 1, limit = 10) =>
      `puestos?page=${pages}&limit=${limit}`,
    getOne: (id: number) => `puestos/${id}`,
    getOneDetails: (id: number) => `puestos/${id}/competenciasYIdiomas`,
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
  },
};
