import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { FormCrearCandidato, FormCrearPuesto } from './formsTypes';

export const formsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFormCrearCandidatos: builder.query<FormCrearCandidato, void>({
      query: () => endpoints.form.getFormCrearCandidato,
    }),
    getFormCrearPuestos: builder.query<FormCrearPuesto, void>({
      query: () => endpoints.form.getFormCrearPuesto,
    }),
  }),
});

export const { useGetFormCrearCandidatosQuery, useGetFormCrearPuestosQuery } =
  formsApiSlice;
