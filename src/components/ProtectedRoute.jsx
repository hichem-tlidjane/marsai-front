import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRolen, mustBeUnlogged = false }) => {
  const { user } = useAuthStore();

  if (!user && mustBeUnlogged) {
    return <Navigate to="/" replace />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && !user.roles.includes(allowedRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
