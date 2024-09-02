import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';

export const puestosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPuestos: builder.query<AuthUser, void>({
      query: () => endpoints.puestos.getAll,
    }),
  }),
});

export const { useGetAllPuestosQuery } = puestosApiSlice;
