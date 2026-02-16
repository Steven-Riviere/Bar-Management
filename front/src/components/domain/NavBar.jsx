import { NavLink, useNavigate } from 'react-router-dom';
import apiFetch from "../../api/apiClient.js";
import { ROUTE_BARS, ROUTE_BEERS, ROUTE_ORDERS, ROUTE_PAYMENTS, ROUTE_TABLES, ROUTE_USERS, ROUTE_LOGIN } from '../../constante.js';

function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error(err);
    }
    onLogout(null);
    navigate(ROUTE_LOGIN);
  };

  if (!user) return null; // ne rien afficher si non connecté

  const links = [
    { to: ROUTE_BARS, label: 'Bars' },
    { to: ROUTE_BEERS, label: 'Bières' },
    { to: ROUTE_ORDERS, label: 'Commandes' },
    { to: ROUTE_PAYMENTS, label: 'Paiements' },
    { to: ROUTE_TABLES, label: 'Tables' },
    { to: ROUTE_USERS, label: 'Utilisateurs' }
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">

        <div className="font-bold text-white text-lg tracking-wide">
          Gestion des bars
        </div>

        <div className="hidden md:flex space-x-4">
          {links.map(({to, label}) => (
            <NavLink
              key={to}
              to={to}
              className={({isActive}) =>
                `px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-200 text-gray-900 shadow-md shadow-gray-500/20'
                    : 'text-white hover:bg-gray-700 hover:text-white hover:shadow-sm hover:shadow-black/20'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div>
          <button 
            className="px-4 py-2 rounded-md border border-white text-white hover:bg-gray-700 hover:text-white hover:shadow-sm hover:shadow-black/20"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className="md:hidden flex flex-col space-y-1 px-4 pb-2">
        {links.map(({to, label}) => (
          <NavLink
            key={to}
            to={to}
            className={({isActive}) =>
              `px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-200 text-gray-900 shadow-md shadow-gray-500/20'
                  : 'text-white hover:bg-gray-700 hover:text-white hover:shadow-sm hover:shadow-black/20'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
