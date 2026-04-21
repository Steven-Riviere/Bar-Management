import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/domain/NavBar.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./components/domain/ProtectedRoute.jsx";
import { ROUTE_BARS, ROUTE_BEERS, ROUTE_ORDERS, ROUTE_PAYMENTS, ROUTE_TABLES, ROUTE_USERS, ROUTE_LOGIN, ROUTE_SIGNUP, ROUTE_BAR_EDIT, ROUTE_BAR_CREATE, ROUTE_BEER_EDIT, ROUTE_DASHBOARD } from "./constante";
import AuthWatcher from "./AuthWatcher.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import BarsList from "./pages/bars/BarsList.jsx";
import BarEdit from "./pages/bars/BarEdit.jsx";
import BarCreate from "./pages/bars/BarCreate.jsx";
import BeersList from "./pages/beers/BeersList.jsx";
import BeerEdit from "./pages/beers/BeerEdit.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import {useAuthContext } from "./context/useAuthContext";
import {AuthProvider} from "./context/authContext";


function App() {
  const { user, setUser, loading, checkAuth } = useAuthContext();

  if (loading) return <div>Chargement...</div>;

  return (
    <>
      <AuthWatcher checkAuth={checkAuth} />

      {user && <NavBar user={user} onLogout={() => setUser(null)} />}

      <div className="container mt-5">
        <Routes>
          <Route
            path={ROUTE_LOGIN}
            element={!user ? <LoginPage onLogin={setUser} /> : <Navigate to={ROUTE_DASHBOARD} />}
          />

        <Route
          path={ROUTE_SIGNUP}
          element={
            !user
              ? <RegisterPage onRegister={() => {}} />
              : <Navigate to={ROUTE_BARS} />
          }
        />

        <Route
          path={ROUTE_DASHBOARD}
          element={
            <ProtectedRoute checkAuth={checkAuth}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
          <Route
            path={ROUTE_BARS}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <BarsList/>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE_BAR_EDIT}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <BarEdit/>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE_BAR_CREATE}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <BarCreate/>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTE_BEERS}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <BeersList/>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTE_BEER_EDIT}
            element={
              <ProtectedRoute checkAuth={checkAuth}>
                <BeerEdit/>
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
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
