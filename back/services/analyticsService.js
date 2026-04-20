import StockMovement from "../models/stockMovement.js";
import Commande from "../models/commande.js";
import BiereCommande from "../models/biereCommande.js";
import Biere from "../models/biere.js";
import Bar from "../models/bar.js";
import { Op, fn, col, Sequelize } from "sequelize";

export async function getGlobalIncome() {
    const orders = await Commande.findAll();
    const total = orders.reduce((sum, o) => sum + (o.price || 0), 0);

    return { total };
}

export async function getIncomeByBar() {
    const bars = await Bar.findAll({
        include: {
            model: Commande,
            attributes: ["price"]
        }
    });

    return bars.map(bar => ({
        bar: bar.name,
        total: bar.Commandes.reduce((s, c) => s+ (c.price || 0), 0)
    }));
}

export async function getTopBeers(limit = 5) {
    const result = await BiereCommande.findAll({
        attributes: [
            "biere_id",
            [fn("SUM", col("quantity")), "totalSold"]
        ],
        group: ["biere_id"],
        order: [[fn("SUM", col("quantity")), "DESC"]],
        limit,
        include: [{ model: Biere }]
    });

    return result;
}

export async function getSalesByPeriod(startDate, endDate) {
    const orders = await Commande.findAll({
        where: {
            date: {
                [Op.between]: [startDate, endDate]
            }
        }
    });

    return {
        total: orders.reduce((s, o) => s + (o.price || 0), 0),
        count: orders.length
    };
}

export async function getStockUsage() {
    const movements = await StockMovement.findAll();

    const totalOut = movements
        .filter(m => m.type === "OUT")
        .reduce((s, m) => s + m.quantity, 0);

    return { totalOut };
}