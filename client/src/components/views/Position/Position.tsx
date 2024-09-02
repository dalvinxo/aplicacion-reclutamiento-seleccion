import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// HACK: se debe mostrar not found en caso de que el puesto no exista
export const Position = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: '1.5rem' }}>
      <Outlet />
    </Box>
  );
};
