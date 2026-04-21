export default function StockUsageChart({ data = [] }) {
    return (
        <div className="p-4 border rounded-xl shadow">
            <h2 className="font-semibold mb-3">📦 Usage stock</h2>

            <div className="space-y-2">
                {data.length ? (
                    data.map((item) => (
                        <div
                            key={`${item.bar_id}-${item.biere_id}`}
                            className="flex justify-between p-2 bg-gray-50 rounded"
                        >
                            <span>
                                {item.beer_name} ({item.bar_name})
                            </span>

                            <span className="font-bold">
                                Stock: {item.stock}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aucune donnée</p>
                )}
            </div>
        </div>
    );
}