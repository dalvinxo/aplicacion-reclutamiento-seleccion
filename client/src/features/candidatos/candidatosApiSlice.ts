import { IFormularioPuesto } from '../../components/views/Maintenance/Puestos/FormularioPuesto';
import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { ICreateCandidato } from './candidatosTypes';

export const puestosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCandidato: builder.mutation<any, ICreateCandidato>({
      query: (body) => ({
        url: endpoints.candidatos.create,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateCandidatoMutation } = puestosApiSlice;
