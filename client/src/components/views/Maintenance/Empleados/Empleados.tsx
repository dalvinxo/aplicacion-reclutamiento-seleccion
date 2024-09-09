import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Empleados = () => {
  return (
    <>
      <Box padding={3}>
        <Outlet />
      </Box>
    </>
  );
};