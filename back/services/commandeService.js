import Paiement from "../models/paiement.js";
import CommandePaiement from "../models/commandePaiement.js";

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
        restant: commande.price - totalPaye,
        paiements
    };
}

export async function ajouterPaiement(commande, method, amount) {
    let paiement = await Paiement.findOne({ where: { method } });
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
