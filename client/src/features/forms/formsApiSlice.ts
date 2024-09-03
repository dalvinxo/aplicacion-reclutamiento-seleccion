import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { FormCrearCandidato } from './formsTypes';

export const formsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFormCrearCandidatos: builder.query<FormCrearCandidato, void>({
      query: () => endpoints.form.getFormCrearCandidato,
    }),
  }),
});

export const { useGetFormCrearCandidatosQuery } = formsApiSlice;
