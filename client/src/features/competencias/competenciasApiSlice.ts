import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { Competencia, Competencias } from './competenciasTypes';

export const competenciasApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompetencias: builder.query<
      Competencias,
      { pages?: number; limit?: number }
    >({
      query: ({ pages, limit }) => endpoints.competencias.getAll(pages, limit),
    }),
    getOneCompetencia: builder.query<Competencia, number>({
      query: (id) => endpoints.puestos.getOneDetails(id),
    }),
  }),
});

export const { useGetAllCompetenciasQuery, useGetOneCompetenciaQuery } =
  competenciasApiSlice;
