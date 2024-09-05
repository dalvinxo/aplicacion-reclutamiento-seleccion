import { Box, Grid2, Typography } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const Maintenance = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: '1.5rem' }}>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          <Grid2 size="auto" paddingTop={3}>
            <Sidebar />
          </Grid2>
          <Grid2 size="grow">
            <Outlet />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
