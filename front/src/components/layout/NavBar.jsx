import { NavLink, useNavigate } from 'react-router-dom';
import apiFetch from "../../api/apiClient.js";
import { ROUTE_BARS, ROUTE_BEERS, ROUTE_ORDERS, ROUTE_PAYMENTS, ROUTE_TABLES, ROUTE_USERS, ROUTE_LOGIN } from '../../constante.js';

export default function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error(err);
    }
    onLogout(null);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">

        {/* Logo / Nom */}
        <div className="font-bold text-white text-lg tracking-wide">
          BarPilot 🍺
        </div>

        {/* Infos user */}
        <div className="text-gray-300 text-sm hidden md:block">
          {user.name} ({user.role})
        </div>

        {/* Actions */}
        <div>
          <button 
            className="px-4 py-2 rounded-md border border-white text-white hover:bg-gray-700 transition"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
