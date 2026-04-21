export default function IncomeByChart({ data = [] }) {
    return (
        <div className="p-4 border rounded-xl shadow">
            <h2 className="font-semibold mb-3">💰 CA par bar</h2>

            <div className="space-y-2">
                {data.length ? (
                    data.map((bar) => (
                        <div
                            key={bar.barId || bar.bar_id}
                            className="flex justify-between p-2 bg-gray-50 rounded"
                        >
                            <span>{bar.name}</span>
                            <span className="font-bold">{bar.total} €</span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aucune donnée</p>
                )}
            </div>
        </div>
    );
}