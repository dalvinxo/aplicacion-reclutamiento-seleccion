import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { Empleados } from './empleadosTypes';

export const empleadosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmpleados: builder.query<
      Empleados,
      { pages?: number; limit?: number }
    >({
      query: ({ pages, limit }) => endpoints.empleados.getAll(pages, limit),
    }),
    getAllEmpleadosFilter: builder.query<
      Empleados,
      { pages?: number; limit?: number; desde?: string; hasta?: string }
    >({
      query: ({ pages, limit, desde, hasta }) =>
        endpoints.empleados.getAllFilter(pages, limit, desde, hasta),
    }),
  }),
});

export const { useGetAllEmpleadosQuery, useGetAllEmpleadosFilterQuery } =
  empleadosApiSlice;
