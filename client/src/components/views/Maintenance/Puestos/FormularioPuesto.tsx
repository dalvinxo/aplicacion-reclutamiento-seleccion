import { useNavigate, useParams } from 'react-router-dom';

import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import useAlert from '../../../../hook/useAlert';

import SaveIcon from '@mui/icons-material/Save';

import LoadingButton from '@mui/lab/LoadingButton';

import * as yup from 'yup';

import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetFormCrearPuestosQuery } from '../../../../features/forms/formsApiSlice';
import { SpinnerCircularProgress } from '../../../commons/SpinnerCircularProgress';

const formPuestoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es requerido.')
    .min(5, 'El nombre debe tener al menos 5 caracteres.')
    .max(60, 'El nombre no puede exceder los 60 caracteres.'),
  descripcion: yup.string().required('La descripción es requerida.'),
  departamento_id: yup
    .number()
    .required('El departamento es requerido')
    .min(1, 'Selecciona un departamento válido')
    .typeError('Selecciona un departamento válido'),
  nivel_minimo_salario: yup
    .number()
    .positive('El salario mínimo debe ser mayor a 0.')
    .required('El salario mínimo es requerido.'),
  nivel_maximo_salario: yup
    .number()
    .positive('El salario máximo debe ser mayor a 0.')
    .required('El salario máximo es requerido.'),
  competencias: yup
    .array()
    .of(yup.number())
    .min(1, 'Debe seleccionar al menos una competencia.'),
  idiomas: yup
    .array()
    .of(yup.number())
    .length(1, 'Debe tener al menos un idioma seleccionado')
    .min(1, 'Debe seleccionar al menos un idioma.'),
});

interface IFormularioPuesto extends yup.InferType<typeof formPuestoSchema> {}

export const FormularioPuesto = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useGetFormCrearPuestosQuery();

  const { AlertComponent, setError } = useAlert();

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormularioPuesto>({
    resolver: yupResolver(formPuestoSchema),
  });

  const onSubmit: SubmitHandler<IFormularioPuesto> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ padding: '3rem 0 1rem 0' }}
      >
        <Grid container spacing={2}>
          <Grid size={6}>
            <Controller
              name="nombre"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Nombre del puesto"
                  fullWidth
                  {...field}
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              name="descripcion"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Descripción del puesto"
                  fullWidth
                  {...field}
                  error={!!errors.descripcion}
                  helperText={errors.descripcion?.message}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              name="departamento_id"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <>
                  <Select
                    fullWidth
                    labelId="select-departamento-label"
                    id="select-departamento"
                    error={!!errors.departamento_id}
                    displayEmpty
                    {...field}
                  >
                    <MenuItem value={0}>
                      <em>Seleccione el departamento del puesto</em>
                    </MenuItem>
                    {data ? (
                      data.departamentos.map((departamento) => (
                        <MenuItem
                          key={departamento.id_departamento}
                          value={departamento.id_departamento}
                        >
                          {departamento.nombre}
                        </MenuItem>
                      ))
                    ) : (
                      <SpinnerCircularProgress />
                    )}
                  </Select>
                  <FormHelperText error={!!errors.departamento_id}>
                    {errors.departamento_id?.message}
                  </FormHelperText>
                </>
              )}
            />
          </Grid>

          <Grid size={12}>
            <LoadingButton
              color="success"
              loadingPosition="start"
              loading={isLoading}
              type="submit"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Guardar
            </LoadingButton>
          </Grid>

          <Grid size={12}>
            <AlertComponent />
          </Grid>
        </Grid>
      </Box>
      <DevTool control={control} />
    </>
  );
};
