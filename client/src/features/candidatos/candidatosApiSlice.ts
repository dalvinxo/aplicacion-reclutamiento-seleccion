import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { ICreateCandidato, IPerson } from './candidatosTypes';

export const puestosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCandidato: builder.mutation<IPerson, ICreateCandidato>({
      query: (body) => ({
        url: endpoints.candidatos.create,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateCandidatoMutation } = puestosApiSlice;
