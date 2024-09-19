import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useGetAllEmpleadosFilterQuery } from '../../../features/empleados/empleadosApiSlice';
import { Empleado } from '../../../features/empleados/empleadosTypes';
import { SkeletonLoading } from '../../commons/SkeletonLoading';

export const Charts = () => {
  const { data, isLoading } = useGetAllEmpleadosFilterQuery(
    {
      pages: 1,
      limit: 1000,
    },
    {
      refetchOnReconnect: true,
    }
  );

  if (isLoading) return <SkeletonLoading />;

  if (data && data.empleados.length == 0)
    return <>Mantenimiento de usuario - dashboard</>;

  const empleadosPorDepartamento = data?.empleados.reduce(
    (acc, empleado: Empleado) => {
      acc[empleado.departamento] = (acc[empleado.departamento] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {empleadosPorDepartamento &&
          Object.entries(empleadosPorDepartamento).map(
            ([departamento, cantidad]) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={departamento}>
                <Card
                  sx={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    boxShadow: 3,
                    height: '100%',
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" component="div">
                      {departamento}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {cantidad} {cantidad === 1 ? 'Empleado' : 'Empleados'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
      </Grid>
    </Box>
  );
};
