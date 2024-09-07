import Grid from '@mui/material/Grid2';
import { Vacantes } from '../../../features/puestos/puestosTypes';
import { Box } from '@mui/material';
import { PuestoCard } from './PuestoCard';
import { Link } from 'react-router-dom';

interface IPuestoList {
  puestos: Vacantes;
}

export const PuestoList = ({ puestos }: IPuestoList) => {
  return (
    <Box sx={{ flexGrow: 1, padding: '1.5rem' }}>
      <Grid container spacing={2}>
        {puestos.puestos.map((puesto) => (
          <Grid
            size={6}
            to={`/${puesto.id_puesto}`}
            component={Link}
            key={puesto.id_puesto}
            style={{ textDecoration: 'none' }}
          >
            <PuestoCard puesto={puesto} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
