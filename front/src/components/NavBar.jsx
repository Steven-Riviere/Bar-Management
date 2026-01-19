import { Link, useNavigate } from 'react-router-dom';
import apiFetch from "../api/apiClient.js";
import { ROUTE_BARS, ROUTE_BEERS, ROUTE_ORDERS, ROUTE_PAYMENTS, ROUTE_TABLES, ROUTE_USERS, ROUTE_LOGIN } from '../constante';

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

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <strong>Gestion des bars</strong>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_BARS}>Bars</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_BEERS}>Bières</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_ORDERS}>Commandes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_PAYMENTS}>Paiements</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_TABLES}>Tables</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_USERS}>Utilisateurs</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
