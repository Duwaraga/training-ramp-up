import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../Pages/App/App";

const useAuth = () => {
  const { user } = UserContext(UserContext);
  return user && user.signedIn;
};

const ProtectedRoutes = () => {
  const location = useLocation;
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
