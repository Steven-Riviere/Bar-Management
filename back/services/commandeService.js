import Paiement from "../models/paiement.js";
import CommandePaiement from "../models/commandePaiement.js";
import Commande from "../models/commande.js";
import Table from "../models/table.js";
import Biere from "../models/biere.js";
import BiereCommande from "../models/biereCommande.js";

export async function getAllCommandes() {
    return Commande.findAll({
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } },
            { model: Biere, through: { attributes: ["quantity", "unit_price"] } }
        ]
    });
}

export async function getCommande(id) {
    return Commande.findByPk(id, {
        include: [
            { model: Table, include: ["Bar"] },
            { model: Paiement, through: { attributes: ["amount"] } },
            { model: Biere, through: { attributes: ["quantity", "unit_price"] } }

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

//Paiements associés à une commande
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
    if (amount <= 0) 
        {
            throw new Error("Montant invalide");
        }
    let paiement = await Paiement.findOne({ where: { method } });

    if (!paiement) paiement = await Paiement.create({ method });

    await commande.addPaiement(paiement, {
        through: { amount }
    });

    return await calculerSolde(commande);
}

export async function modifierPaiement(commande_id, paiement_id, newAmount) {
    const pivot = await CommandePaiement.findOne({ where: { commande_id, paiement_id }});

    if (!pivot) return null;

    pivot.amount = newAmount;
    await pivot.save();

    return pivot;
}

export async function supprimerPaiement(commande_id, paiement_id) {
    return CommandePaiement.destroy({where: { commande_id, paiement_id }});
}

// Bière associée à une commande
export async function ajouterBiere(commande, biereId, quantity) {
    const biere = await Biere.findByPk(biereId);
    if (!biere) throw new Error("Bière introuvable");
    if (quantity <= 0) throw new Error("Quantité invalide");

    const unit_price = biere.price;
    await commande.addBiere(biere, { through: { quantity, unit_price } });

    return Commande.findByPk(commande.id, {
        include: [{ model: Biere, through: { attributes: ["quantity", "unit_price"] } }]
    });
}

export async function modifierBiere(commande_id, biere_id, quantity, unit_price) {
    const ligne = await BiereCommande.findOne({ where: { commande_id, biere_id } });
    if (!ligne) return null;

    if (quantity !== undefined) ligne.quantity = quantity;
    if (unit_price !== undefined) ligne.unit_price = unit_price;

    await ligne.save();
    return ligne;
}

export async function supprimerBiere(commande_id, biere_id) {
    return BiereCommande.destroy({ where: { commande_id, biere_id } });
}