import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import './App.css';
import { ROUTE_BARS, ROUTE_BEERS, ROUTE_ORDERS, ROUTE_PAYMENTS, ROUTE_TABLES, ROUTE_USERS, ROUTE_LOGIN } from "./constante";

function App() {
  const [user, setUser] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      }
    }, 
  []);

  return (
    <Router>
      {/* Affiche la NavBar uniquement si l'utilisateur est connecté */}
      {user && <NavBar user={user} onLogout={setUser} />}

      <div className="container mt-5">
        <Routes>
          {/* Route par défaut : redirige selon connexion */}
          <Route
            path="/"
            element={user ? <Navigate to={ROUTE_BARS} /> : <Navigate to={ROUTE_LOGIN} />}
          />

          {/* Login */}
          <Route
            path={ROUTE_LOGIN}
            element={!user ? <LoginPage onLogin={setUser} /> : <Navigate to={ROUTE_BARS} />}
          />

          {/* Routes protégées */}
          <Route
            path={ROUTE_BARS}
            element={user ? <div>Page Bars</div> : <Navigate to={ROUTE_LOGIN} />}
          />
          <Route
            path={ROUTE_BEERS}
            element={user ? <div>Page Bières</div> : <Navigate to={ROUTE_LOGIN} />}
          />
          <Route
            path={ROUTE_ORDERS}
            element={user ? <div>Page Commandes</div> : <Navigate to={ROUTE_LOGIN} />}
          />
          <Route
            path={ROUTE_PAYMENTS}
            element={user ? <div>Page Paiements</div> : <Navigate to={ROUTE_LOGIN} />}
          />
          <Route
            path={ROUTE_TABLES}
            element={user ? <div>Page Tables</div> : <Navigate to={ROUTE_LOGIN} />}
          />
          <Route
            path={ROUTE_USERS}
            element={user ? <div>Page Users</div> : <Navigate to={ROUTE_LOGIN} />}
          />

          {/* Fallback pour n'importe quelle route non définie */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
