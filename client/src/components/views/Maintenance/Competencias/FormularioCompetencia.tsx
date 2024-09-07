import { useNavigate, useParams } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Stack, TextField } from '@mui/material';
import { SpinnerCircularProgress } from '../../../commons/SpinnerCircularProgress';
import useAlert from '../../../../hook/useAlert';
import { useEffect } from 'react';
import {
  useCreateCompetenciaMutation,
  useLazyGetOneCompetenciaQuery,
  useUpdateCompetenciaMutation,
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

  const [crearCompetencia, { isLoading: isLoadingCreate }] =
    useCreateCompetenciaMutation();
  const [actualizarCompetencia, { isLoading: isLoadingUpdate }] =
    useUpdateCompetenciaMutation();
  const [consultarCompetencia, { isFetching }] =
    useLazyGetOneCompetenciaQuery();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormularioCompetencia>();

  const updateCompetencia = async (
    id: string,
    body: IFormularioCompetencia
  ) => {
    const idCompetencia = Number(id);

    if (isNaN(idCompetencia)) {
      setError('El id debe ser un número');
      return;
    }

    await actualizarCompetencia({
      id: idCompetencia,
      descripcion: body.description,
    })
      .unwrap()
      .then((response) => {
        enqueueSnackbar('Competencia actualizada correctamente', {
          variant: 'success',
        });
        navigate('/mantenimiento/competencias', { replace: true });
      })
      .catch((error: IException) => {
        setError(error.data.message);
      });
  };

  const createCompetencia = async (body: IFormularioCompetencia) => {
    await crearCompetencia({
      descripcion: body.description,
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

  const onSubmit: SubmitHandler<IFormularioCompetencia> = async (data) => {
    if (id) {
      await updateCompetencia(id, data);
      return;
    }

    await createCompetencia(data);
  };

  useEffect(() => {
    if (id) {
      consultarCompetencia(parseInt(id))
        .unwrap()
        .then((data) => {
          console.log(data);
          setValue('description', data.descripcion);
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
            aria-autocomplete="none"
            slotProps={{
              inputLabel: { shrink: !!watch('description') },
            }}
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
            loading={isLoadingCreate || isLoadingUpdate || isFetching}
            loadingPosition="start"
            type="submit"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Guardar
          </LoadingButton>
          {/* <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isLoading}
          >
            Guardar
          </Button> */}

          {/* {isLoadingCreate || is && <SpinnerCircularProgress />} */}
          <AlertComponent />
        </Stack>
      </Box>
    </>
  );
};
