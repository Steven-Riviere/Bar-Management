import { useState } from "react";
import { ROUTE_SIGNUP } from "../constante";
import { login as apiLogin } from "../api/apiAuth";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiLogin({ email, password });

      // Stocke le token JWT
      localStorage.setItem("token", data.token);

      // Décode le token pour récupérer le user
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      onLogin(payload);

    } catch (err) {
      setError(err?.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="col-md-4 offset-md-4 mt-5">
        <h2>Connexion</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre email"
                />
            </div>

            <div className="mb-3">
                <label>Mot de passe</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="votre mot de passe"
                />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
            </button>
        </form>

        <p className="mt-3 text-center">
            Pas encore de compte ? <a href={ROUTE_SIGNUP}>Inscrivez-vous</a>
        </p>
    </div>
  );
}

export default LoginPage;