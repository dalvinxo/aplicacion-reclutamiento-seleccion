export const endpoints = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    user: 'auth/user',
  },
  puestos: {
    getAll: (pages: number = 1, limit = 10) =>
      `puestos?page=${pages}&limit=${limit}`,
  },
};
