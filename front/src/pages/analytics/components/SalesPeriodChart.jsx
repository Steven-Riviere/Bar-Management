export default function SalesPeriodChart({ data }) {
    if (!data) {
        return <div className="p-4 border rounded">Aucune donnée</div>;
    }

    return (
        <div className="p-4 border rounded-xl shadow">
            <h2 className="font-semibold mb-3">📈 Ventes période</h2>

            <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Total</span>
                <span className="font-bold">{data.total} €</span>
            </div>

            <div className="flex justify-between p-2 bg-gray-50 rounded mt-2">
                <span>Nombre de commandes</span>
                <span className="font-bold">{data.count}</span>
            </div>
        </div>
    );
}