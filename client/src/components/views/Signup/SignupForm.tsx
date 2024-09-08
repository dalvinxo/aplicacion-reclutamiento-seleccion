import React from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useLoginMutation,
  useSignupMutation,
} from '../../../features/auth/authApiSlice';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';
import useAlert from '../../../hook/useAlert';
import { useAppDispatch } from '../../../store/hook';
import { setUser } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

interface ISignupForm {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const SignupForm = () => {
  const navigate = useNavigate();

  const { AlertComponent, setError } = useAlert();

  const [signup, { isLoading }] = useSignupMutation();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    await signup({ ...data })
      .unwrap()
      .then((response) => {
        enqueueSnackbar(
          `El usuario ${response.user} fue registrado correctamente`,
          { variant: 'success' }
        );
        navigate('/iniciar-sesion', { replace: true });
      })
      .catch((error: IException) => {
        setError(error.data.message);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ padding: '1.5rem', width: '24rem' }}
    >
      <Stack spacing={4}>
        <TextField
          label="Nombre de usuario"
          {...register('username', {
            required: 'Por favor, ingrese su nombre de usuario',
            minLength: {
              value: 5,
              message: 'El nombre de usuario debe tener al menos 5 caracteres',
            },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
        />

        <TextField
          label="Correo electrónico"
          {...register('email', {
            required: 'Por favor, ingrese su correo electrónico',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Por favor, ingrese un correo electrónico válido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />

        <TextField
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            required: 'Por favor, ingrese su contraseña',
            minLength: {
              value: 7,
              message: 'La contraseña debe tener al menos 7 caracteres',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Confirmar contraseña"
          type={'password'}
          {...register('confirmPassword', {
            required: 'Por favor, confirme su contraseña',
            validate: (value) =>
              value === watch('password') || 'Las contraseñas no coinciden',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Inscribirse
        </Button>

        {isLoading && <SpinnerCircularProgress />}
        <AlertComponent />
      </Stack>
    </Box>
  );
};

export default SignupForm;
