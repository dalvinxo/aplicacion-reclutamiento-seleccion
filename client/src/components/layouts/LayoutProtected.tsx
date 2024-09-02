import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hook';
import { PropsWithChildren } from 'react';

export const LayoutProtected = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  return !!user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
