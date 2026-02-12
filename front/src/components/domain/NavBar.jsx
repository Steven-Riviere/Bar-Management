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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">

        <strong className="navbar-brand">Gestion des bars</strong>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTE_BARS}>Bars</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTE_BEERS}>Bières</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTE_ORDERS}>Commandes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTE_PAYMENTS}>Paiements</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTE_TABLES}>Tables</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTE_USERS}>Utilisateurs</NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
