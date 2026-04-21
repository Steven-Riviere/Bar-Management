import { useNavigate } from "react-router-dom";

const Card = ({ title, description, onClick }) => (
  <div
    onClick={onClick}
    className="p-5 rounded-xl border shadow hover:shadow-lg transition cursor-pointer w-full"
  >
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

export default function AdminHub() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-3xl font-bold">Admin Hub</h1>
        <p className="text-gray-500">
          Accès global à toutes les interfaces métier
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Gérant</h2>

        <Card
          title="Analytics"
          description="CA, ventes, performance globale"
          onClick={() => navigate("/analytics")}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">RH</h2>

        <Card
          title="Gestion RH"
          description="Utilisateurs, rôles, permissions"
          onClick={() => navigate("/users")}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Opérations</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Bars"
            description="Gestion des établissements"
            onClick={() => navigate("/bars")}
          />

          <Card
            title="Bières"
            description="Catalogue produits"
            onClick={() => navigate("/beers")}
          />

          <Card
            title="Commandes"
            description="Suivi des ventes"
            onClick={() => navigate("/orders")}
          />

          <Card
            title="Stock"
            description="Mouvements & inventaire"
            onClick={() => navigate("/stock")}
          />
        </div>
      </section>

    </div>
  );
}