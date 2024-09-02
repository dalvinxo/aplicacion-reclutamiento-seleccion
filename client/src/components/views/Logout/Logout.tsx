import { LogoutRounded } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useLogoutMutation } from '../../../features/auth/authApiSlice';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';
import { enqueueSnackbar } from 'notistack';

export const Logout = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const onclickLogout = async () => {
    await logout()
      .unwrap()
      .then((response) => {
        enqueueSnackbar(response.message, { variant: 'success' });
      });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Stack gap={3}>
          <Typography variant="h6" display={'block'} gutterBottom>
            ¿Estas seguro que quieres cerrar sesión?
          </Typography>
          <Button
            onClick={onclickLogout}
            variant="outlined"
            color="error"
            startIcon={<LogoutRounded />}
          >
            Cerrar Sesión
          </Button>
          {isLoading && <SpinnerCircularProgress />}
        </Stack>
      </Box>
    </>
  );
};
