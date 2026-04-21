import { useEffect, useState } from "react";
import { getIncomeByBar, getTopBeers } from "../../../api/apiAnalytics";

export default function AdminAnalytics() {
  const [bars, setBars] = useState([]);
  const [top, setTop] = useState([]);

  useEffect(() => {
    const load = async () => {
      setBars(await getIncomeByBar());
      setTop(await getTopBeers(5));
    };
    load();
  }, []);

  return (
    <div>
      <h2>Analytics</h2>

      <h3>Revenu par bar</h3>
      {bars.map(b => (
        <p key={b.bar_id}>{b.name} : {b.total} €</p>
      ))}

      <h3>Top bières</h3>
      {top.map(b => (
        <p key={b.id}>{b.name}</p>
      ))}
    </div>
  );
}