import Paiement from "../models/paiement.js";
import CommandePaiement from "../models/commandePaiement.js";
import Commande from "../models/commande.js";
import Table from "../models/table.js";

export async function getAllCommandes() {
    return Commande.findAll({
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } }
        ]
    });
}

export async function getCommande(id) {
    return Commande.findByPk(id, {
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } }
        ]
    });
}

export async function createCommande(data) {
    const table = await Table.findByPk(data.table_id);
    if (!table) throw new Error("Table non trouvée");
    return Commande.create(data);
}

export async function updateCommande(id, data) {
    const commande = await Commande.findByPk(id);
    if (!commande) throw new Error("Commande non trouvée");
    return commande.update(data);
}

export async function removeCommande(id) {
    const commande = await Commande.findByPk(id);
    if (!commande) throw new Error("Commande non trouvée");
    await commande.destroy();
    return true;
}

export async function calculerSolde(commande) {
    const paiements = await commande.getPaiements({
        joinTableAttributes: ["amount"]
    });

    const totalPaye = paiements.reduce(
        (sum, p) => sum + p.CommandePaiement.amount,
        0
    );

    return {
        total: commande.price,
        totalPaye,
        restant: Math.max(0, commande.price - totalPaye),
        paiements
    };
}

export async function ajouterPaiement(commande, method, amount) {
    let paiement = await Paiement.findOne({ where: { method } });
    if (amount <= 0) {
    throw new Error("Montant invalide");
    }
    if (!paiement) paiement = await Paiement.create({ method });

    await commande.addPaiement(paiement, {
        through: { amount }
    });

    return await calculerSolde(commande);
}

export async function modifierPaiement(commande_id, paiement_id, newAmount) {
    const pivot = await CommandePaiement.findOne({
        where: { commande_id, paiement_id }
    });

    if (!pivot) return null;

    pivot.amount = newAmount;
    await pivot.save();

    return pivot;
}

export async function supprimerPaiement(commande_id, paiement_id) {
    return CommandePaiement.destroy({
        where: { commande_id, paiement_id }
    });
}
