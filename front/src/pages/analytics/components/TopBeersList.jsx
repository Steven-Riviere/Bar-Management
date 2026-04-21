export default function TopBeersList({ data = [] }) {
    return (
        <div className="p-4 border rounded-xl shadow">
            <h2 className="font-semibold mb-3">🍻 Top bières</h2>

            <ul className="space-y-2">
                {data.length ? (
                    data.map((beer, index) => (
                        <li
                            key={beer.biereId || beer.biere_id}
                            className="flex justify-between p-2 bg-gray-50 rounded"
                        >
                            <span>
                                #{index + 1} {beer.name}
                            </span>
                            <span className="font-bold">
                                {beer.quantity_sold} ventes
                            </span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">Aucune donnée</p>
                )}
            </ul>
        </div>
    );
}