import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { Idioma, Idiomas } from './idiomasTypes';

export const idiomasApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIdiomas: builder.query<Idiomas, { pages?: number; limit?: number }>({
      query: ({ pages, limit }) => endpoints.idiomas.getAll(pages, limit),
    }),
    getOneIdioma: builder.query<Idioma, number>({
      query: (id) => endpoints.idiomas.getOne(id),
    }),
    createIdioma: builder.mutation<Idioma, { nombre: string }>({
      query: (data) => ({
        url: endpoints.idiomas.create,
        method: 'POST',
        body: { ...data },
      }),
    }),
    updateIdioma: builder.mutation<
      Idioma,
      { id: number; nombre?: string; estado?: boolean }
    >({
      query: ({ id, ...data }) => ({
        url: endpoints.idiomas.update(id),
        method: 'PATCH',
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const {
  useGetAllIdiomasQuery,
  useLazyGetOneIdiomaQuery,
  useUpdateIdiomaMutation,
  useCreateIdiomaMutation,
} = idiomasApiSlice;
