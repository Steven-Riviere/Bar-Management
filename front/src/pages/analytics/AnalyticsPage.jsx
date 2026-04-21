import { useEffect, useState } from "react";
import { getGlobalIncome, getIncomeByBar, getTopBeers, getSalesByPeriod, getStockUsage } from "../../api/apiAnalytics";
import GlobalIncomeCard from "./components/GlobalIncomeCard";
import IncomeByChart from "./components/IncomeByChart";
import TopBeersList from "./components/TopBeersList";
import SalesPeriodChart from "./components/SalesPeriodChart";
import StockUsageChart from "./components/StockUsageChart";
import { useNavigate } from "react-router-dom";

export default function AnalyticsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const today = new Date();
                const start = new Date(today.getFullYear(), today.getMonth(), 1);
                const end = today;

                const [global, byBar, topBeers, sales, stockUsage] = await Promise.all([
                getGlobalIncome(),
                getIncomeByBar(),
                getTopBeers(),
                getSalesByPeriod(start.toISOString(), end.toISOString()),
                getStockUsage()
                ]);

                setData({
                    global,
                    byBar,
                    topBeers,
                    sales,
                    stockUsage
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <div className="p-4">Chargement des analytics...</div>;
    if (error) return <div className="p-4 text-red-500">Erreur : {error}</div>;
    if (!data) return <div className="p-4">Aucune donnée</div>;

    return (
        <div className="p-6 space-y-6">

            <div className="flex items-center justify-between">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 transition text-sm"
                >
                    ← Admin Hub
                </button>

                <h1 className="text-2xl font-bold">
                    Analytics - Gérant
                </h1>

                <div className="w-[120px]" />
            </div>

            <div className="grid gap-6">
                <GlobalIncomeCard total={data.global.total} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <IncomeByChart data={data.byBar} />
                <TopBeersList data={data.topBeers} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <SalesPeriodChart data={data.sales} />
                <StockUsageChart data={data.stockUsage} />
            </div>

        </div>
    );
}