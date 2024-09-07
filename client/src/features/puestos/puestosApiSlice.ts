import { IFormularioPuesto } from '../../components/views/Maintenance/Puestos/FormularioPuesto';
import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import {
  PuestoDetails,
  PuestoIdiomaCompetencia,
  Puestos,
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
    getOnePuestoById: builder.query<PuestoIdiomaCompetencia, number>({
      query: (id) => endpoints.puestos.getOne(id),
    }),
    getPuestoDetailsById: builder.query<PuestoDetails, number>({
      query: (id) => endpoints.puestos.getOneDetails(id),
    }),
    createPuesto: builder.mutation<RootPuesto, IFormularioPuesto>({
      query: (body) => ({
        url: endpoints.puestos.create,
        method: 'POST',
        body,
      }),
    }),
    updatePuesto: builder.mutation<
      RootPuesto,
      Partial<IFormularioPuesto> & { id_puesto: number; estado?: boolean }
    >({
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
  useLazyGetOnePuestoByIdQuery,
  useUpdatePuestoMutation,
  useCreatePuestoMutation,
} = puestosApiSlice;
