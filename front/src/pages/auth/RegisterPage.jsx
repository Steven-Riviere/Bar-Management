import { useState } from "react"
import { ROUTE_LOGIN } from "../../constante";
import { signup as apiSignup } from "../../api/apiAuth";
import { Link } from "react-router-dom";

function RegisterPage({onRegister}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiSignup({ email, password, name });
      onRegister();
    } catch (err) {
      setError(err.message || "Erreur lors de la création du compte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-card">
        <h2>Création de compte</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
        <p className="text-muted">
            <small>Les champs marqués d’un <span className="text-danger">*</span> sont obligatoires.</small>
        </p>

        <div className="mb-3">
            <label>Prénom <span className="text-danger">*</span></label>
            <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </div>

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

            <small className="text-muted">
            <i>Doit contenir 8 caractères, 1 majuscule et 1 chiffre.</i>
            </small>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Création de compte..." : "Créer le compte"}
        </button>
        </form>

        <p className="mt-3 text-center">
            Déjà un compte ? <Link to={ROUTE_LOGIN}>Connectez-vous</Link>
        </p>
    </div>
    );

}

export default RegisterPage;