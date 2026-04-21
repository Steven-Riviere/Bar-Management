import Paiement from "../models/paiement.js";
import CommandePaiement from "../models/commandePaiement.js";
import Commande from "../models/commande.js";
import Table from "../models/table.js";
import Biere from "../models/biere.js";
import BarBiere from "../models/barBiere.js";
import BiereCommande from "../models/biereCommande.js";
import { applyMovement } from "./stockMovementService.js";


export async function getAllOrders() {
    return Commande.findAll({
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } },
            { model: Biere, through: { attributes: ["quantity", "unitPrice"] } }
        ]
    });
}

export async function getOrder(id) {
    return Commande.findByPk(id, {
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } },
            { model: Biere, through: { attributes: ["quantity", "unitPrice"] } }
        ]
    });
}

export async function createOrder(data) {
    const table = await Table.findByPk(data.tableId);
    if (!table) throw new Error("Table non trouvée");

    return Commande.create({
        tableId: table.id,
        date: data.date,
        price: 0,
        status: "en cours"
    });
}

export async function updateOrder(id, data) {
    const order = await Commande.findByPk(id);
    if (!order) throw new Error("Commande non trouvée");

    return order.update(data);
}

export async function deleteOrder(id) {
    const order = await Commande.findByPk(id);
    if (!order) throw new Error("Commande non trouvée");

    await order.destroy();
    return true;
}

export async function calculateOrderTotal(orderId) {
    const lines = await BiereCommande.findAll({
        where: { commandeId: orderId }
    });

    const total = lines.reduce((sum, line) => {
        return sum + (line.quantity * line.unitPrice);
    }, 0);

    await Commande.update(
        { price: total },
        { where: { id: orderId } }
    );

    return total;
}

export async function calculateBalance(order) {
    const payments = await order.getPayments({
        joinTableAttributes: ["amount"]
    });

    const totalPaye = payments.reduce(
        (sum, p) => sum + p.CommandePaiement.amount,
        0
    );

    return {
        total: order.price,
        totalPaye,
        restant: Math.max(0, order.price - totalPaye),
        payments
    };
}

export async function addPayment(order, method, amount) {
    if (amount <= 0) throw new Error("Montant invalide");

    let payment = await Paiement.findOne({ where: { method } });
    if (!payment) payment = await Paiement.create({ method });

    await order.addPayment(payment, {
        through: { amount }
    });

    return calculateBalance(order);
}

export async function updatePayment(commandeId, paiementId, amount) {
    if (amount <= 0) throw new Error("Montant invalide");

    const pivot = await CommandePaiement.findOne({
        where: { commandeId, paiementId }
    });

    if (!pivot) return null;

    pivot.amount = amount;
    await pivot.save();

    return pivot;
}

export async function deletePayment(commandeId, paiementId) {
    return CommandePaiement.destroy({
        where: { commandeId, paiementId }
    });
}


export async function addBeer(order, biereId, quantity, userId = null) {
    if (quantity <= 0) throw new Error("Quantité invalide");

    const beer = await Biere.findByPk(biereId);
    if (!beer) throw new Error("Bière introuvable");

    const table = await Table.findByPk(order.tableId);
    if (!table) throw new Error("Table introuvable");

    const barBiere = await BarBiere.findOne({
        where: {
            barId: table.barId,
            biereId
        }
    });

    if (!barBiere) {
        throw new Error("Bière non liée à ce bar");
    }

    if (!barBiere.active) {
        throw new Error("Bière désactivée dans ce bar");
    }

    await order.addBeer(beer, {
        through: {
            quantity,
            unitPrice: barBiere.price
        }
    });

    await applyMovement({
        type: "OUT",
        quantity,
        biereId,
        fromBarId: table.barId,
        userId,
        reason: "SALE",
        sourceType: "ORDER",
        sourceId: order.id
    });

    await calculateOrderTotal(order.id);

    return getOrder(order.id);
}

export async function updateBeer(commandeId, biereId, quantity, userId = null) {
    const line = await BiereCommande.findOne({
        where: { commandeId, biereId }
    });

    if (!line) return null;
    if (quantity <= 0) throw new Error("Quantité invalide");

    const diff = quantity - line.quantity;

    line.quantity = quantity;
    await line.save();

    const order = await Commande.findByPk(commandeId);
    const table = await Table.findByPk(order.tableId);

    if (diff !== 0) {
        await applyMovement({
            type: diff > 0 ? "OUT" : "IN",
            quantity: Math.abs(diff),
            biereId,
            fromBarId: diff > 0 ? table.barId : null,
            toBarId: diff < 0 ? table.barId : null,
            userId,
            reason: "SALE",
            sourceType: "ORDER",
            sourceId: commandeId
        });
    }

    await calculateOrderTotal(commandeId);

    return line;
}

export async function deleteBeer(commandeId, biereId, userId = null) {
    const line = await BiereCommande.findOne({
        where: { commandeId, biereId }
    });

    if (!line) return true;

    const quantity = line.quantity;

    const order = await Commande.findByPk(commandeId);
    const table = await Table.findByPk(order.tableId);

    await line.destroy();

    await applyMovement({
        type: "IN",
        quantity,
        biereId,
        toBarId: table.barId,
        userId,
        reason: "ADJUSTMENT",
        sourceType: "ORDER_DELETE",
        sourceId: commandeId
    });

    await calculateOrderTotal(commandeId);

    return true;
}