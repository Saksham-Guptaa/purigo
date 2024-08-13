import { Navigate, Outlet } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const PrivateRoute = () => {
  const { isLoggedIn } = useFirebase();

  return isLoggedIn ? <Outlet /> : <Navigate to="/account/login" />;
};

export default PrivateRoute;
