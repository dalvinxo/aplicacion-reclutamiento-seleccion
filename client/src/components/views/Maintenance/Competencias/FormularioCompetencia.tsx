import { useNavigate, useParams } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import { SpinnerCircularProgress } from '../../../commons/SpinnerCircularProgress';
import useAlert from '../../../../hook/useAlert';
import { useEffect } from 'react';
import {
  useCreateCompetenciaMutation,
  useLazyGetOneCompetenciaQuery,
} from '../../../../features/competencias/competenciasApiSlice';
import SaveIcon from '@mui/icons-material/Save';

import LoadingButton from '@mui/lab/LoadingButton';
import { enqueueSnackbar } from 'notistack';

interface IFormularioCompetencia {
  description: string;
}

export const FormularioCompetencia = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { AlertComponent, setError } = useAlert();

  const [crearCompetencia, { isLoading }] = useCreateCompetenciaMutation();

  const [consultarCompetencia, { isFetching }] =
    useLazyGetOneCompetenciaQuery();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormularioCompetencia>();

  const onSubmit: SubmitHandler<IFormularioCompetencia> = async (data) => {
    await crearCompetencia({
      descripcion: data.description,
    })
      .unwrap()
      .then((_response) => {
        enqueueSnackbar(`Competencia creada correctamente`, {
          variant: 'success',
        });
        navigate('/mantenimiento/competencias', { replace: true });
      })
      .catch((error: IException) => {
        setError(error.data.message);
      });
  };

  useEffect(() => {
    if (id) {
      consultarCompetencia(parseInt(id))
        .unwrap()
        .then((data) => {
          reset({
            description: data.descripcion,
          });
        });
    }
  }, [id, reset]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ padding: '3rem 0 1rem 0', width: '22rem' }}
      >
        <Stack spacing={2}>
          <TextField
            label="competencia"
            {...register('description', {
              required: 'Por favor, ingrese la competencia',
              minLength: {
                value: 5,
                message: 'La competencia debe tener al menos 5 caracteres',
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            margin="normal"
          />

          <LoadingButton
            color="success"
            loading={isLoading || isFetching}
            loadingPosition="start"
            type="submit"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </LoadingButton>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isLoading}
          >
            Guardar
          </Button>

          {isLoading && <SpinnerCircularProgress />}
          <AlertComponent />
        </Stack>
      </Box>
    </>
  );
};
