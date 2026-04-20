import StockMovement from "../models/stockMovement.js";
import BarBiere from "../models/barBiere.js";

export async function applyMovement(data) {
    const { type, quantity, biere_id, from_bar_id, to_bar_id } = data;

    //CHECK STOCK AVANT OUT / TRANSFER SORTANT
    if (type === "OUT" || type === "TRANSFER") {
        if (from_bar_id) {
            const stock = await BarBiere.findOne({
                where: { bar_id: from_bar_id, biere_id }
            });

            if (!stock) {
                throw new Error("Stock introuvable");
            }

            if (stock.stock < quantity) {
                throw new Error("Stock insuffisant");
            }
        }
    }

    //MOUVEMENTS DES STOCKS
    const movement = await StockMovement.create(data);

    if(type ==="OUT" && from_bar_id) {
        await BarBiere.decrement("stock", {
            by: quantity,
            where: {bar_id: from_bar_id, biere_id}
        });
    }

    //réception des stocks
    if (type === "IN" && to_bar_id) {
        await BarBiere.increment("stock", {
        by: quantity,
        where: { bar_id: to_bar_id, biere_id }
        });
    }

    //transfert d'un bar <-> entrepôt
    if (type === "TRANSFER") {
        if (from_bar_id) {
            await BarBiere.decrement("stock", {
                by: quantity,
                where: { bar_id: from_bar_id, biere_id }
            });
        }

        if (to_bar_id) {
            await BarBiere.increment("stock", {
                by: quantity,
                where: { bar_id: to_bar_id, biere_id }
            });
        }
    }
    return movement;
}