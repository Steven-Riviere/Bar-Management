import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../api/apiClient.js";

export default function ProtectedRoute({ children, checkAuth }) {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    checkAuth()
      .then((ok) => mounted && setIsAuth(ok))
      .catch(() => mounted && setIsAuth(false));

    return () => (mounted = false);
  }, [location.pathname]);

  if (isAuth === null) return <div>Chargement...</div>;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
}
