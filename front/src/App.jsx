import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useAuth from "./hooks/useAuth.js";
import './App.css';
import { ROUTE_BARS, ROUTE_BEERS, ROUTE_ORDERS, ROUTE_PAYMENTS, ROUTE_TABLES, ROUTE_USERS, ROUTE_LOGIN } from "./constante";
import AuthWatcher from "./AuthWatcher.jsx";

function App() {
  const { user, setUser, loading, checkAuth } = useAuth();

  if (loading) return <div>Chargement...</div>;

  return (
    <>
      <AuthWatcher checkAuth={checkAuth} />

      {user && <NavBar user={user} onLogout={() => setUser(null)} />}

      <div className="container mt-5">
        <Routes>
          <Route
            path={ROUTE_LOGIN}
            element={!user ? <LoginPage onLogin={setUser} /> : <Navigate to={ROUTE_BARS} />}
          />

          <Route
            path={ROUTE_BARS}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <div>Page Bars</div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTE_BEERS}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <div>Page Bières</div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTE_ORDERS}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <div>Page Commandes</div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTE_PAYMENTS}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <div>Page Paiements</div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTE_TABLES}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <div>Page Tables</div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTE_USERS}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <div>Page Users</div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={ROUTE_LOGIN} />} />
        </Routes>
      </div>
    </>
  );
}


export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
