import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { UserPersonCandidate } from '../auth/authTypes';
import { ICreateCandidato, IPerson, IUpdateCandidato } from './candidatosTypes';

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
    getCandidateById: builder.query<UserPersonCandidate, number>({
      query: (id) => endpoints.candidatos.getOneDetails(id),
    }),
  }),
});

export const {
  useLazyGetCandidateByIdQuery,
  useCreateCandidatoMutation,
  useUpdateCandidatoMutation,
} = puestosApiSlice;
