import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { Puestos } from './puestosTypes';

export const puestosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPuestos: builder.query<Puestos, { pages?: number; limit?: number }>({
      query: ({ pages, limit }) => endpoints.puestos.getAll(pages, limit),
    }),
  }),
});

export const { useGetAllPuestosQuery } = puestosApiSlice;
