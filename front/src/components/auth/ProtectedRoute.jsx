import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
}