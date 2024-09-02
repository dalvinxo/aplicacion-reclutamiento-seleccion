import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hook';

export const LayoutAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  return !!user ? (
    <Outlet />
  ) : (
    <Navigate to="/iniciar-sesion" state={{ from: location }} replace />
  );
};
