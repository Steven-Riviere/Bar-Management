import { useEffect, useState } from "react";
import { getGlobalIncome } from "../../../api/apiAnalytics";

export default function AdminOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getGlobalIncome();
      setData(res);
    };
    load();
  }, []);

  if (!data) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Dashboard Admin</h1>

      <div>
        <p>CA global : {data.total} €</p>
      </div>
    </div>
  );
}