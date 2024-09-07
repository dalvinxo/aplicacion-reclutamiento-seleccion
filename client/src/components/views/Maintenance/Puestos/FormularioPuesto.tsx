import { useNavigate, useParams } from 'react-router-dom';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
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
import { NivelRiesgo } from '../../../../features/puestos/puestosTypes';
import {
  useCreatePuestoMutation,
  useLazyGetOnePuestoByIdQuery,
  useUpdatePuestoMutation,
} from '../../../../features/puestos/puestosApiSlice';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

const formPuestoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es requerido.')
    .min(5, 'El nombre debe tener al menos 5 caracteres.')
    .max(60, 'El nombre no puede exceder los 60 caracteres.'),
  descripcion: yup
    .string()
    .required('La descripción es requerida.')
    .min(10, 'La descripción debe tener al menos 10 caracteres.'),
  departamento_id: yup
    .number()
    .required('El departamento es requerido')
    .min(1, 'Selecciona un departamento válido')
    .typeError('Selecciona un departamento válido'),
  nivel_riesgo: yup
    .string()
    .oneOf(Object.values(NivelRiesgo), 'Selecciona un nivel de riesgo válido')
    .required('El nivel de riesgo es requerido'),
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
    .max(3, 'Solo puede seleccionar 3 idiomas')
    .min(1, 'Debe seleccionar al menos un idioma.'),
});

export interface IFormularioPuesto
  extends yup.InferType<typeof formPuestoSchema> {}

export const FormularioPuesto = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [crearPuesto, { isLoading: isLoadingCreate }] =
    useCreatePuestoMutation();

  const [actualizarPuesto, { isLoading: isLoadingUpdate }] =
    useUpdatePuestoMutation();

  const [consultarPuesto] = useLazyGetOnePuestoByIdQuery();

  const { data, isLoading } = useGetFormCrearPuestosQuery();

  const { AlertComponent, setError } = useAlert();

  const {
    watch,
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormularioPuesto>({
    resolver: yupResolver(formPuestoSchema),
  });

  const createPuesto = async (body: IFormularioPuesto) => {
    await crearPuesto(body)
      .unwrap()
      .then((_response) => {
        enqueueSnackbar(`Idioma creada correctamente`, {
          variant: 'success',
        });
        navigate('/mantenimiento/puestos', { replace: true });
      })
      .catch((error: IException) => {
        setError(error.data.message);
      });
  };

  const updatePuesto = async (id: string, body: IFormularioPuesto) => {
    const idPuesto = Number(id);

    if (isNaN(idPuesto)) {
      setError('El id debe ser un número');
      return;
    }

    await actualizarPuesto({
      id_puesto: idPuesto,
      ...body,
    })
      .unwrap()
      .then((_response) => {
        enqueueSnackbar('Puesto actualizada correctamente', {
          variant: 'success',
        });
        navigate('/mantenimiento/puestos', { replace: true });
      })
      .catch((error: IException) => {
        setError(error.data.message);
      });
  };

  const onSubmit: SubmitHandler<IFormularioPuesto> = async (data) => {
    if (id) {
      console.log(id, data);
      await updatePuesto(id, data);
      return;
    }

    createPuesto(data);
  };

  useEffect(() => {
    if (id) {
      consultarPuesto(parseInt(id))
        .unwrap()
        .then((data) => {
          console.log(data);

          const dbPuesto = data as IFormularioPuesto;
          reset({
            ...dbPuesto,
          });
          //  setValue('nombre', data.nombre);
        });
    }
  }, [id, reset]);

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

          <Grid size={6}>
            <Controller
              name="nivel_riesgo"
              control={control}
              defaultValue={NivelRiesgo.Bajo}
              render={({ field }) => (
                <>
                  <Select
                    fullWidth
                    id="select-nivel-riesgo"
                    error={!!errors.nivel_riesgo}
                    displayEmpty
                    {...field}
                  >
                    <MenuItem>
                      <em>Seleccione el nivel de riesgo</em>
                    </MenuItem>
                    {Object.values(NivelRiesgo).map((nivel) => (
                      <MenuItem key={nivel} value={nivel}>
                        {nivel}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors.nivel_riesgo}>
                    {errors.nivel_riesgo?.message}
                  </FormHelperText>
                </>
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              name="nivel_minimo_salario"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Salario Mínimo"
                  error={!!errors.nivel_minimo_salario}
                  helperText={errors.nivel_minimo_salario?.message}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              name="nivel_maximo_salario"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  label="Salario Máximo"
                  error={!!errors.nivel_maximo_salario}
                  helperText={errors.nivel_maximo_salario?.message}
                />
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              name="idiomas"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="multiple-chip-idioma">Idiomas</InputLabel>
                    <Select
                      {...field}
                      fullWidth
                      multiple
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      error={!!errors.idiomas}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={
                                data?.idiomas.find(
                                  (idioma) => idioma.id_idioma === value
                                )?.nombre
                              }
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {data ? (
                        data.idiomas.map((idioma) => (
                          <MenuItem
                            key={idioma.id_idioma}
                            value={idioma.id_idioma}
                          >
                            {idioma.nombre}
                          </MenuItem>
                        ))
                      ) : (
                        <SpinnerCircularProgress />
                      )}
                    </Select>
                    <FormHelperText error={!!errors.idiomas}>
                      {errors.idiomas?.message}
                    </FormHelperText>
                  </FormControl>
                </>
              )}
            />
          </Grid>

          <Grid size={6}>
            <Controller
              name="competencias"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="multiple-chip-competencia">
                      Competencias
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="multiple-chip-competencia"
                      multiple
                      label="Competencias"
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      error={!!errors.competencias}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={
                                data?.competencias.find(
                                  (competencia) =>
                                    competencia.id_competencia === value
                                )?.descripcion
                              }
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {data ? (
                        data.competencias.map((competencia) => (
                          <MenuItem
                            key={competencia.id_competencia}
                            value={competencia.id_competencia}
                          >
                            {competencia.descripcion}
                          </MenuItem>
                        ))
                      ) : (
                        <SpinnerCircularProgress />
                      )}
                    </Select>
                    <FormHelperText error={!!errors.competencias}>
                      {errors.competencias?.message}
                    </FormHelperText>
                  </FormControl>
                </>
              )}
            />
          </Grid>

          <Grid size={12} padding={'1rem'}>
            <LoadingButton
              color="success"
              fullWidth
              loadingPosition="start"
              loading={isLoading || isLoadingCreate || isLoadingUpdate}
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
