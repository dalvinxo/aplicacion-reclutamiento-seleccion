import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { PuestoDetails, Puestos } from './puestosTypes';

export const puestosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPuestos: builder.query<Puestos, { pages?: number; limit?: number }>({
      query: ({ pages, limit }) => endpoints.puestos.getAll(pages, limit),
    }),
    getPuestoDetailsById: builder.query<PuestoDetails, number>({
      query: (id) => endpoints.puestos.getOneDetails(id),
    }),
  }),
});

export const { useGetAllPuestosQuery, useGetPuestoDetailsByIdQuery } =
  puestosApiSlice;
