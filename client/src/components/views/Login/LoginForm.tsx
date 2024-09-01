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
import { useLoginMutation } from '../../../features/auth/authApiSlice';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';
import useAlert from '../../../hook/useAlert';

interface ILoginForm {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { AlertComponent, setError } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    // Lógica para iniciar sesión

    await login({ ...data })
      .unwrap()
      .then((response) => {
        console.log(response);
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Iniciar sesión
        </Button>

        {isLoading && <SpinnerCircularProgress />}
        <AlertComponent />
      </Stack>
    </Box>
  );
};

export default LoginForm;
