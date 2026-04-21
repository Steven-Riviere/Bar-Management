export default function GlobalIncomeCard({ total }) {

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700">
        Chiffre d'affaires global
      </h2>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-bold text-green-600">
          {total} €
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Données calculées sur les commandes finalisées
      </p>
    </div>
  );
}