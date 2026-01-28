import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { fetchBeer, updateBeer } from "../../api/apiBiere";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const BeerEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [beer, setBeer] = useState({
        name: "",
        description: "",
        degree: "",
        price:"",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadBeer = async () => {
            try {
                const data = await fetchBeer(id);
                setBeer({
                    name: data.name || "",
                    description: data.description ||"",
                    degree: data.degree || "",
                    price : data.price || "",
                });
            } catch (err) {
                setError("Impossible de récupérer la bière");
            } finally {
                setLoading(false);
            }
        };
        loadBeer();
    }, [id]);

    const handleChange = (e) => {
        setBeer({...beer, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation simple
        if (!beer.name || !beer.degree || !beer.price) {
            setError("Ces champs sont obligatoires");
            return;
        }

        try {
            await updateBeer(id, beer);
            navigate('/bieres');
        } catch(err) {
            setError(err.response?.data?.error ||"Erreur lors de la sauvegarde");
        }
    };

    const handleBack = () => {
        navigate('/bieres');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="beer-edit-page">
            <div className="d-flex justify-content-start mb-3">
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                    Retour
                </button>
            </div>
            <div className="cardBase">
                <h2>Détails de la bière</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-flex justify-content-end mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setIsEditing(true)}
                        title="Modifier la bière"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input
                            className="form-control"
                            name="name"
                            value={beer.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={beer.description}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={4}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Degrès d'alcool</label>
                        <input
                            className="form-control"
                            name="degree"
                            value={beer.degree}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Prix</label>
                        <input
                            className="form-control"
                            name="price"
                            value={beer.price}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    {isEditing && (
                        <div className="d-flex justify-content-end mt-4">
                            <button className="btn btn-primary" type="submit">
                                Enregistrement
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default BeerEdit;