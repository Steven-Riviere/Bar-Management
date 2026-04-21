import { useEffect, useState } from "react";
import { fetchBars } from "../../../api/apiBar";

export default function AdminBars() {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchBars();
      setBars(data);
    };
    load();
  }, []);

  return (
    <div>
      <h2>Gestion des bars</h2>

      {bars.map(bar => (
        <div key={bar.id}>
          <p>{bar.name} - {bar.city}</p>
        </div>
      ))}
    </div>
  );
}