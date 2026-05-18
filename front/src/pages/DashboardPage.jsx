import { useAuthContext } from "../context/useAuthContext";
import AdminHub from "./admin/AdminHub";
import AnalyticsPage from "./analytics/AnalyticsPage";
import HumanRessourcePage from "./rh/HumanRessourcePage";


export default function DashboardPage() {
  const { user } = useAuthContext();

  if (!user) return null;

  if (user.role === "ADMIN") {
    return <AdminHub />;
  }
  if (user.role === "GERANT") {
      return <AnalyticsPage />;
  }
  if (user.role === "RH") {
    return <HumanRessourcePage />;
  }
  if (user.role === "SERVEUR") {
    return <OrdersPage />;
  }
  if (user.role === "BARMAN") {
    return <BarHub />;
  }

  return <div>Accès refusé</div>;
}