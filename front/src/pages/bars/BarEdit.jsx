import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBar, updateBar } from "../../api/apiBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const BarEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bar, setBar] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    tel: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadBar = async () => {
      try {
        const data = await fetchBar(id);
        setBar({
          name: data.name || "",
          address: data.address || "",
          postalCode: data.postalCode || "",
          city: data.city || "",
          tel: data.tel || "",
        });
      } catch (err) {
        setError("Impossible de récupérer le bar");
      } finally {
        setLoading(false);
      }
    };

    loadBar();
  }, [id]);

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
      await updateBar(id, bar);
      navigate("/bars"); // retour à la liste
    } catch (err) {
      setError("Erreur lors de la sauvegarde");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="register-card">

      <h2>Détails du bar</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setIsEditing(true)}
          title="Modifier le bar"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>


      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom</label>
          <input
            className="form-control"
            name="name"
            value={bar.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label>Adresse</label>
          <input
            className="form-control"
            name="address"
            value={bar.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label>Code Postal</label>
          <input
            className="form-control"
            name="postalCode"
            value={bar.postalCode}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label>Ville</label>
          <input
            className="form-control"
            name="city"
            value={bar.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label>Téléphone</label>
          <input
            className="form-control"
            name="tel"
            value={bar.tel}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default BarEdit;
