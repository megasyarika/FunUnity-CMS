// frontend/src/components/PrivateRoute.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Tampilkan loading jika masih mengecek status autentikasi
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect ke login jika tidak terautentikasi
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render rute yang dilindungi
  return <Outlet />;
};

export default PrivateRoute;