import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hook';
import { EnumRoles } from '../../features/auth/authTypes';

export const LayoutAccess = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  return !!user && user.rol_id != EnumRoles.CANDIDATE ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
