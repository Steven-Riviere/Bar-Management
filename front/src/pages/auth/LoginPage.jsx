import { useState } from "react";
import { ROUTE_SIGNUP } from "../../constante";
import { login as apiLogin } from "../../api/apiAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    try {
      const data = await apiLogin({ email, password });
      onLogin(data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cardBase">
        <h2>Connexion</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <p className="text-muted">
          <small>Les champs marqués d’un <span className="text-danger">*</span> sont obligatoires.</small>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label>Email <span className="text-danger">*</span></label>
              <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
          </div>

          <div className="mb-3">
              <label>Mot de passe <span className="text-danger">*</span></label>
              <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-3 text-center">
            Pas encore de compte ? <Link to={ROUTE_SIGNUP}>Inscrivez-vous</Link>
        </p>
    </div>
  );
}

export default LoginPage;