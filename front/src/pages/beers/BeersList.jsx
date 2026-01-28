import { useEffect, useState } from "react"
import { fetchBeers, patchBeer } from "../../api/apiBiere";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BeersList = () => {
    const [beers, setBeers] = useState([]);

    useEffect(() => {
        const loadBeers = async () => {
            try {
            const beersData = await fetchBeers();
            setBeers(beersData);
            } catch (error) {
                console.error("Failed to fetch beers:", error);
            }
        };
        loadBeers();
    }, []);

    const handleDisable = async(id, e) => {
        e.preventDefault();
        try {
            await patchBeer(id, {active:false});
            setBeers(beers.map(beer =>
                beer.id === id ? {...beer, active: false} : beer   
            ));
        } catch (error) {
            console.error("Failed to deactivate beer :", error);
        }
    };

    const handleEnable = async (id, e) => {
        e.preventDefault();
        try {
            await patchBeer(id, {active:true});
            setBeers(beers.map(beer => 
                beer.id === id ? {...beer, active: true} : beer
            ));
        } catch(error) {
            console.error('Failed to enable beer:', error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-end mb-4">
                <Link
                    to={`/bieres/new`}
                    className="btn btn-primary btn-lg"
                    title="Ajouter une bière"
                >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Ajouter une bière
                </Link>
            </div>

            <div className="row">
            {beers.map(beer => (
                <div className="col-md-3 mb-4" key={beer.id}>
                    <div className={`card h-100 beer-card position-relative ${!beer.active ? "inactive" : ""}`}>
                        <div className="card-body">
                            <h3 className="card-title">{beer.name}</h3>
                            <span className={`badge ${beer.active ? "bg-success" : "bg-secondary"} mb-2`}>
                            {beer.active ? "Actif" : "Inactif"}
                            </span>
                            <p className="description">
                                Degrès d'alcool : {beer.degree}°<br/>
                                Prix de base : {beer.price}€<br/>
                            </p>
                            <div className="position-absolute d-flex gap-2" style={{right: 8, bottom: 8}}>
                                {beer.active ? (
                                    <button 
                                    className="btn btn-danger btn-sm" 
                                    title="Désactiver la bière" 
                                    onClick={(e) => handleDisable(beer.id, e)}
                                    >
                                        <FontAwesomeIcon icon={faBan} />
                                    </button>
                                ) : (
                                    <button 
                                    className="btn btn-success btn-sm" 
                                    title="Activer la bière" 
                                    onClick={(e) => handleEnable(beer.id,e)} 
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                )}
                                <Link to={'/bars'} 
                                    className="btn btn-secondary btn-sm"
                                    title="Consulter le bar"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default BeersList;