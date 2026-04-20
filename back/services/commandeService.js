import Paiement from "../models/paiement.js";
import CommandePaiement from "../models/commandePaiement.js";
import Commande from "../models/commande.js";
import Table from "../models/table.js";
import Biere from "../models/biere.js";
import BiereCommande from "../models/biereCommande.js";
import { applyMovement } from "./stockMovementService.js";

export async function getAllOrders() {
    return Commande.findAll({
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } },
            { model: Biere, through: { attributes: ["quantity", "unit_price"] } }
        ]
    });
}

export async function getOrder(id) {
    return Commande.findByPk(id, {
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } },
            { model: Biere, through: { attributes: ["quantity", "unit_price"] } }

        ]
    });
}

export async function createOrder(data) {
        const table = await Table.findByPk(data.table_id);
        if (!table) throw new Error("Table non trouvée");
        return Commande.create({
        table_id: table.id,
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

export async function calculateOrderTotal(order) {
    const beers = await order.getBieres({
        joinTableAttributes: ["quantity", "unit_price"]
    });
    return beers.reduce(
        (sum, b) =>
            sum + (b.BiereCommande.quantity * b.BiereCommande.unit_price),
        0
    );
}

//Paiements associés à une commande
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

export async function updatePayment(commande_id, paiement_id, amount) {
    if (amount <= 0) throw new Error("Montant invalide");

    const pivot = await CommandePaiement.findOne({
        where: { commande_id, paiement_id }
    });

    if (!pivot) return null;

    pivot.amount = amount;
    await pivot.save();

    return pivot;
}

export async function deletePayment(commande_id, paiement_id) {
    return CommandePaiement.destroy({where: { commande_id, paiement_id }});
}

// Bière associée à une commande
export async function addBeer(order, biere_id, quantity) {
    if (quantity <= 0) throw new Error("Quantité invalide");

    const beer = await Biere.findByPk(biere_id);
    if (!beer) throw new Error("Bière introuvable");

    const table = await Table.findByPk(order.table_id);

    await order.addBeer(beer, {
        through: {
            quantity,
            unit_price: beer.price
        }
    });

    //Stock OUT
    await applyMovement({
        type: "OUT",
        quantity,
        biere_id,
        from_bar_id: table.bar_id
    });

    const total = await calculateOrderTotal(order);
    await order.update({ price: total });

    return order;
}

export async function updateBeer(commande_id, biere_id, quantity) {
    const line = await BiereCommande.findOne({ where: { commande_id, biere_id } });
    if (!line) return null;

    if (quantity <= 0) throw new Error("Quantité invalide");

    const diff = quantity - line.quantity;

    line.quantity = quantity;
    await line.save();

    const order = await Commande.findByPk(commande_id);
    const table = await Table.findByPk(order.table_id);

    if (diff !== 0) {
        await applyMovement({
            type: diff > 0 ? "OUT" : "IN",
            quantity: Math.abs(diff),
            biere_id,
            from_bar_id: diff > 0 ? table.bar_id : null,
            to_bar_id: diff < 0 ? table.bar_id : null
        });
    }

    const total = await calculateOrderTotal(order);
    await order.update({ price: total });

    return line;
}

export async function deleteBeer(commande_id, biere_id) {
    const line = await BiereCommande.findOne({ where: { commande_id, biere_id } });

    if (!line) return true;

    const quantity = line.quantity;

    const order = await Commande.findByPk(commande_id);
    const table = await Table.findByPk(order.table_id);

    await line.destroy();

    // Retour en stock vu que commande supprimée
    await applyMovement({
        type: "IN",
        quantity,
        biere_id,
        to_bar_id: table.bar_id
    });

    const total = await calculateOrderTotal(order);
    await order.update({ price: total });

    return true;
}