import Grid from '@mui/material/Grid2';
import { useGetCandidateUserQuery } from '../../../features/auth/authApiSlice';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../store/hook';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

export const Profile = () => {
  const auth = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetCandidateUserQuery();

  if (isLoading) return <SpinnerCircularProgress />;

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: '1.5rem' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Información del Usuario</Typography>
                <Typography variant="body1">
                  <strong>Username:</strong> {auth?.user}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {auth?.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {data && (
            <>
              <Grid size={{ xs: 12 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Información Personal</Typography>
                    <Typography variant="body1">
                      <strong>Cédula:</strong> {data.persona.cedula}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Nombre:</strong> {data.persona.nombre}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Salario Aspirado:</strong> $
                      {data.salario_aspirado}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Recomendado Por:</strong> {data.recomendado_por}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};
