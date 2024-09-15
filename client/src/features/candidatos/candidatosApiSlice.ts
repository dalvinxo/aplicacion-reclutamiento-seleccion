import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { UserPersonCandidate } from '../auth/authTypes';
import {
  CandidatosFilters,
  ICandidatoContrato,
  ICreateCandidato,
  IPerson,
  IUpdateCandidato,
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
    contratarCandidato: builder.mutation<
      ICandidatoContrato,
      { candidateo_id: number; fecha_ingreso: Date; salario_mensual: string }
    >({
      query: ({ candidateo_id, ...body }) => ({
        url: endpoints.candidatos.contratar(candidateo_id),
        method: 'PATCH',
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
    getAllCandidatosFilter: builder.query<
      CandidatosFilters,
      {
        pages?: number;
        limit?: number;
        puesto_id?: number;
        competencia_id?: number;
        idioma_id?: number;
        nivel_capacitacion?: string;
      }
    >({
      query: ({
        pages,
        limit,
        competencia_id,
        idioma_id,
        nivel_capacitacion,
        puesto_id,
      }) =>
        endpoints.candidatos.getAllFilter(
          pages,
          limit,
          puesto_id,
          competencia_id,
          idioma_id,
          nivel_capacitacion
        ),
    }),
  }),
});

export const {
  useLazyGetCandidateByIdQuery,
  useGetAllCandidatosFilterQuery,
  useCreateCandidatoMutation,
  useUpdateCandidatoMutation,
  useContratarCandidatoMutation,
} = puestosApiSlice;
