import { useAuthContext } from "../../context/useAuthContext";
import AdminOverview from "./admin/AdminOverview";

export default function DashboardPage() {
  const { user } = useAuthContext();

  if (!user) return null;

  switch (user.role) {
    case "ADMIN":
      return <AdminOverview />;

    default:
      return <div>Accès refusé</div>;
  }
}