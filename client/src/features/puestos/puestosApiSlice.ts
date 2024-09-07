import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import {
  PuestoDetails,
  Puestos,
  PutPuesto,
  RootPuesto,
  Vacantes,
} from './puestosTypes';

export const puestosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPuestos: builder.query<Puestos, { pages?: number; limit?: number }>({
      query: ({ pages, limit }) => endpoints.puestos.getAll(pages, limit),
    }),
    getAllVacantes: builder.query<Vacantes, { pages?: number; limit?: number }>(
      {
        query: ({ pages, limit }) =>
          endpoints.puestos.getAllVacantes(pages, limit),
      }
    ),
    getPuestoDetailsById: builder.query<PuestoDetails, number>({
      query: (id) => endpoints.puestos.getOneDetails(id),
    }),
    updatePuesto: builder.mutation<RootPuesto, PutPuesto>({
      query: ({ id_puesto, ...data }) => ({
        url: endpoints.puestos.update(id_puesto),
        method: 'PATCH',
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const {
  useGetAllPuestosQuery,
  useGetAllVacantesQuery,
  useGetPuestoDetailsByIdQuery,
  useUpdatePuestoMutation,
} = puestosApiSlice;
