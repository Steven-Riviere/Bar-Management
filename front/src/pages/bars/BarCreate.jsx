import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBar } from "../../api/apiBar";

const BarCreate = () => {
  const navigate = useNavigate();
  const [bar, setBar] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    tel: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setBar({ ...bar, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation simple
        if (!bar.name || !bar.address || !bar.postalCode || !bar.city || !bar.tel) {
        setError("Tous les champs sont obligatoires");
        return;
        }

        try {
        await addBar(bar);
        navigate('/bars');
        } catch (err) {
        setError(err.response?.data?.error || "Erreur lors de la création");
        }
    };

    const handleBack = () => {
        navigate('/bars');
    };

    return (
        <div className="bar-create-page">
            <div className="d-flex justify-content-start mb-3">
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                    Retour
                </button>
            </div>
            <div className="register-card">

            <h2>Ajouter un bar</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nom du bar</label>
                    <input
                    name="name"
                    className="form-control"
                    value={bar.name}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Adresse</label>
                    <input
                    name="address"
                    className="form-control"
                    value={bar.address}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Code postal</label>
                    <input
                    name="postalCode"
                    className="form-control"
                    value={bar.postalCode}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ville</label>
                    <input
                        className="form-control"
                        name="city"
                        value={bar.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Téléphone</label>
                    <input
                        className="form-control"
                        name="tel"
                        value={bar.tel}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary">
                        Enregistrement
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default BarCreate;