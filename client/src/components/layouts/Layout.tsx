import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppBarMenu } from '../commons/AppBarMenu';
import { useAppSelector } from '../../store/hook';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useGetUserQuery } from '../../features/auth/authApiSlice';
import { SpinnerCircularProgress } from '../commons/SpinnerCircularProgress';
import { SnackbarProvider } from 'notistack';
import { SkeletonLoading } from '../commons/SkeletonLoading';

export const Layout = () => {
  const user = useAppSelector(selectCurrentUser);

  const { isFetching } = useGetUserQuery(undefined, {
    skip: !!user,
  });

  return (
    <Container maxWidth="lg">
      {isFetching ? (
        <SkeletonLoading />
      ) : (
        <SnackbarProvider maxSnack={3}>
          <AppBarMenu />
          <Outlet />
        </SnackbarProvider>
      )}
    </Container>
  );
};
