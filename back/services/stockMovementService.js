import sequelize from "../config/database.js";
import StockMovement from "../models/stockMovement.js";
import BarBiere from "../models/barBiere.js";

export async function applyMovement(data) {
    const t = await sequelize.transaction();

    try {
        const { type, quantity, biereId, fromBarId, toBarId, userId, reason, sourceType, sourceId } = data;

        // =========================
        // CHECK STOCK
        // =========================
        if (type === "OUT" || type === "TRANSFER") {
            if (fromBarId) {
                const stock = await BarBiere.findOne({
                    where: { barId: fromBarId, biereId },
                    transaction: t
                });

                if (!stock) {
                    throw new Error("Stock introuvable");
                }

                if (stock.stock < quantity) {
                    throw new Error("Stock insuffisant");
                }
            }
        }

        // =========================
        // CREATE MOVEMENT
        // =========================
        const movement = await StockMovement.create(data, { transaction: t });

        // =========================
        // APPLY STOCK CHANGES
        // =========================

        // OUT
        if (type === "OUT" && fromBarId) {
            await BarBiere.decrement("stock", {
                by: quantity,
                where: { barId: fromBarId, biereId },
                transaction: t
            });
        }

        // IN
        if (type === "IN" && toBarId) {
            const existing = await BarBiere.findOne({
                where: { barId: toBarId, biereId },
                transaction: t
            });

            if (!existing) {
                await BarBiere.create({
                    barId: toBarId,
                    biereId,
                    stock: quantity,
                    price: 0
                }, { transaction: t });
            } else {
                await BarBiere.increment("stock", {
                    by: quantity,
                    where: { barId: toBarId, biereId },
                    transaction: t
                });
            }
        }

        // TRANSFER
        if (type === "TRANSFER") {

            if (fromBarId) {
                await BarBiere.decrement("stock", {
                    by: quantity,
                    where: { barId: fromBarId, biereId },
                    transaction: t
                });
            }

            if (toBarId) {
                const existing = await BarBiere.findOne({
                    where: { barId: toBarId, biereId },
                    transaction: t
                });

                if (!existing) {
                    await BarBiere.create({
                        barId: toBarId,
                        biereId,
                        stock: quantity,
                        price: 0
                    }, { transaction: t });
                } else {
                    await BarBiere.increment("stock", {
                        by: quantity,
                        where: { barId: toBarId, biereId },
                        transaction: t
                    });
                }
            }
        }

        await t.commit();
        return movement;

    } catch (error) {
        await t.rollback();
        throw error;
    }
}