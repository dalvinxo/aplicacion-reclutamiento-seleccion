import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppBarMenu } from '../commons/AppBarMenu';

export const Layout = () => {
  return (
    <Container maxWidth="lg">
      <AppBarMenu />
      <Outlet />
    </Container>
  );
};
