import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import {
  ICreateCandidato,
  IPerson,
  IUpdateCandidato,
  IUpdatePerson,
} from './candidatosTypes';

export const puestosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCandidato: builder.mutation<IPerson, ICreateCandidato>({
      query: (body) => ({
        url: endpoints.candidatos.create,
        method: 'POST',
        body,
      }),
    }),
    updateCandidato: builder.mutation<
      IPerson,
      IUpdateCandidato & { persona_id: number }
    >({
      query: ({ persona_id, ...body }) => ({
        url: endpoints.candidatos.update(persona_id),
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useCreateCandidatoMutation, useUpdateCandidatoMutation } =
  puestosApiSlice;
