import Grid from '@mui/material/Grid2';
import { Puestos } from '../../../features/puestos/puestosTypes';
import { Box } from '@mui/material';
import { PuestoCard } from './PuestoCard';

interface IPuestoList {
  puestos: Puestos;
}

export const PuestoList = ({ puestos }: IPuestoList) => {
  return (
    <Box sx={{ flexGrow: 1, padding: '1.5rem' }}>
      <Grid container spacing={2}>
        {puestos.puestos.map((puesto) => (
          <Grid size={6} key={puesto.id_puesto}>
            <PuestoCard puesto={puesto} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
