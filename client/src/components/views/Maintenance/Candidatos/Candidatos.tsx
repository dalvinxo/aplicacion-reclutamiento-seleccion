import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Candidatos = () => {
  return (
    <>
      <Box padding={3}>
        <Outlet />
      </Box>
    </>
  );
};
