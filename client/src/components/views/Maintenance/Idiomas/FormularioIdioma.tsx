import { useNavigate, useParams } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Stack, TextField } from '@mui/material';
import useAlert from '../../../../hook/useAlert';
import { useEffect } from 'react';

import SaveIcon from '@mui/icons-material/Save';

import LoadingButton from '@mui/lab/LoadingButton';
import { enqueueSnackbar } from 'notistack';
import {
  useCreateIdiomaMutation,
  useLazyGetOneIdiomaQuery,
  useUpdateIdiomaMutation,
} from '../../../../features/idiomas/idiomasApiSlice';

interface IFormularioIdioma {
  nombre: string;
}

export const FormularioIdioma = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { AlertComponent, setError } = useAlert();

  const [crearIdioma, { isLoading: isLoadingCreate }] =
    useCreateIdiomaMutation();
  const [actualizarIdioma, { isLoading: isLoadingUpdate }] =
    useUpdateIdiomaMutation();
  const [consultarIdioma, { isFetching }] = useLazyGetOneIdiomaQuery();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormularioIdioma>();

  const updateIdioma = async (id: string, body: IFormularioIdioma) => {
    const idIdioma = Number(id);

    if (isNaN(idIdioma)) {
      setError('El id debe ser un número');
      return;
    }

    await actualizarIdioma({
      id: idIdioma,
      nombre: body.nombre,
    })
      .unwrap()
      .then((response) => {
        enqueueSnackbar('Idioma actualizada correctamente', {
          variant: 'success',
        });
        navigate('/mantenimiento/idiomas', { replace: true });
      })
      .catch((error: IException) => {
        setError(error.data.message);
      });
  };

  const createIdioma = async (body: IFormularioIdioma) => {
    await crearIdioma({
      nombre: body.nombre,
    })
      .unwrap()
      .then((_response) => {
        enqueueSnackbar(`Idioma creada correctamente`, {
          variant: 'success',
        });
        navigate('/mantenimiento/idiomas', { replace: true });
      })
      .catch((error: IException) => {
        setError(error.data.message);
      });
  };

  const onSubmit: SubmitHandler<IFormularioIdioma> = async (data) => {
    if (id) {
      await updateIdioma(id, data);
      return;
    }

    await createIdioma(data);
  };

  useEffect(() => {
    if (id) {
      consultarIdioma(parseInt(id))
        .unwrap()
        .then((data) => {
          console.log(data);
          setValue('nombre', data.nombre);
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
            label="idioma"
            aria-autocomplete="none"
            slotProps={{
              inputLabel: { shrink: !!watch('nombre') },
            }}
            {...register('nombre', {
              required: 'Por favor, ingrese el idioma',
              minLength: {
                value: 5,
                message: 'El idioma debe tener al menos 5 caracteres',
              },
            })}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
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
