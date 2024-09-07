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
      query: (id) => endpoints.competencias.getOne(id),
    }),
    createCompetencia: builder.mutation<Competencia, { descripcion: string }>({
      query: (data) => ({
        url: endpoints.competencias.create,
        method: 'POST',
        body: { ...data },
      }),
    }),
    updateCompetencia: builder.mutation<
      Competencia,
      { id: number; descripcion?: string; estado?: boolean }
    >({
      query: ({ id, ...data }) => ({
        url: endpoints.competencias.update(id),
        method: 'PATCH',
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const {
  useGetAllCompetenciasQuery,
  useGetOneCompetenciaQuery,
  useLazyGetOneCompetenciaQuery,
  useCreateCompetenciaMutation,
  useUpdateCompetenciaMutation,
} = competenciasApiSlice;
