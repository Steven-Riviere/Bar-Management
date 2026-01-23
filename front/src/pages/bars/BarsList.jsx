import { useEffect, useState } from "react"
import { fetchBars, deactivateBar, enableBar  } from "../../api/apiBar";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { ROUTE_BAR_CREATE } from "../../constante";

const BarsList = () => {
    const [bars, setBars] = useState([]);

  useEffect(() => {
    const loadBars = async () => {
      try {
        const barsData = await fetchBars();
        setBars(barsData);
      } catch (error) {
        console.error('Failed to fetch bars:', error);
      }
    };

    loadBars();
  }, []);

    const handleDisable = async (id, e) => {
    e.preventDefault();
    try {
        await deactivateBar(id);
        setBars(bars.map(bar =>
        bar.id === id ? { ...bar, active: false } : bar
        ));
    } catch (error) {
      console.error('Failed to deactivate bar:', error);
    }
  };

    const handleEnable = async (id, e) => {
    e.preventDefault();
    try {
        await enableBar(id);
        setBars(bars.map(bar =>
        bar.id === id ? { ...bar, active: true } : bar
        ));
    } catch (error) {
      console.error('Failed to enable bar:', error);
    }
  };

    return (
    <div>
        <div className="d-flex justify-content-end mb-4">
        <Link to={ROUTE_BAR_CREATE} className="btn btn-primary">Ajouter un Bar</Link>
        </div>
        <div className="row">
        {bars.map(bar => (
            <div className="col-md-3 mb-4" key={bar.id}>
                <div className={`card h-100 bar-card position-relative ${!bar.active ? "inactive" : ""}`}>
                    <div className="card-body">
                        <h3 className="card-title">{bar.name}</h3>
                        <span className={`badge ${bar.active ? "bg-success" : "bg-secondary"} mb-2`}>
                        {bar.active ? "Actif" : "Inactif"}
                        </span>
                        <p className='description'>
                        {bar.address}<br/>
                        {bar.postalCode}<br/>
                        {bar.city}<br/>
                        {bar.tel}<br/>
                        </p>
                        <div className="position-absolute" style={{ right: 8, bottom: 8 }}>
                        {bar.active ? (
                            <button
                            className="btn btn-danger btn-sm"
                            title="Désactiver le bar"
                            onClick={(e) => handleDisable(bar.id, e)}
                            >
                            <FontAwesomeIcon icon={faBan} />
                            </button>
                        ) : (
                            <button
                            className="btn btn-success btn-sm"
                            title="Activer le bar"
                            onClick={(e) => handleEnable(bar.id, e)}
                            >
                            <FontAwesomeIcon icon={faCheck} />
                            </button>
                        )}
                        <Link
                          to={`/bars/${bar.id}/edit`}
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

export default BarsList;