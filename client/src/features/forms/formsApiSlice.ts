import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import {
  FormCrearCandidato,
  FormCrearPuesto,
  FormSearchCandidato,
} from './formsTypes';

export const formsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFormCrearCandidatos: builder.query<FormCrearCandidato, void>({
      query: () => endpoints.form.getFormCrearCandidato,
    }),
    getFormCrearPuestos: builder.query<FormCrearPuesto, void>({
      query: () => endpoints.form.getFormCrearPuesto,
    }),
    getFormFilterCandidatos: builder.query<FormSearchCandidato, void>({
      query: () => endpoints.form.getFormSearchCandidato,
    }),
  }),
});

export const {
  useGetFormCrearCandidatosQuery,
  useGetFormCrearPuestosQuery,
  useGetFormFilterCandidatosQuery,
} = formsApiSlice;
