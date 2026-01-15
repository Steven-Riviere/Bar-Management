import {Link} from 'react-router-dom';
import { ROUTE_BARS, ROUTE_BEERS, ROUTE_ORDERS, ROUTE_PAYMENTS, ROUTE_TABLES, ROUTE_USERS } from '../constante';

function NavBar() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <strong>Gestion des bars</strong>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link className="nav-link" to="/">Accueil</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={ROUTE_BARS}>Bars</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={ROUTE_BEERS}>Bieres</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={ROUTE_ORDERS}>Commandes</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={ROUTE_PAYMENTS}>Suivi des paiements</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={ROUTE_TABLES}>Suivi des paiements</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={ROUTE_USERS}>Suivi des paiements</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  );
}

export default NavBar;