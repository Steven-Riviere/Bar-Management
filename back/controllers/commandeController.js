import Commande from "../models/commande.js";
import Table from "../models/table.js";
import {calculerSolde,ajouterPaiement,modifierPaiement,supprimerPaiement} from "../services/commandeService.js";
import Paiement from "../models/paiement.js";

export async function getAll(req, res) {
    try {
        const commandes = await Commande.findAll({
            include: [
                {
                    model: Table,
                    include: ["Bar"]
                },
                {
                    model: Paiement,
                    through: { attributes: ["amount"] }
                }
            ]
        });

        res.json(commandes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req, res) {
    try {
        const commande = await Commande.findByPk(req.params.id, {
            include: [
                {
                    model: Table,
                    include: ["Bar"]
                },
                {
                    model: Paiement,
                    through: { attributes: ["amount"] }
                }
            ]
        });

        if (!commande)
            return res.status(404).json({ error: "Commande non trouvée" });

        res.json(commande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function create(req, res) {
    try {
        const { table_id, price, date, status } = req.body;

        const table = await Table.findByPk(table_id);
        if (!table) return res.status(404).json({ error: "Table non trouvée" });

        const cmd = await Commande.create({ table_id, price, date, status });

        res.status(201).json(cmd);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande)
            return res.status(404).json({ error: "Commande non trouvée" });

        await commande.update(req.body);

        res.json(commande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function remove(req, res) {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande)
            return res.status(404).json({ error: "Commande non trouvée" });

        await commande.destroy();

        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addPaiement(req, res) {
    try {
        const { method, amount } = req.body;

        const commande = await Commande.findByPk(req.params.id);
        if (!commande)
            return res.status(404).json({ error: "Commande non trouvée" });

        const solde = await calculerSolde(commande);
        if (amount > solde.restant)
            return res
                .status(400)
                .json({ error: "Montant > solde restant" });

        const final = await ajouterPaiement(commande, method, amount);

        res.status(201).json(final);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function modifyPaiement(req, res) {
    try {
        const { amount } = req.body;
        const { commande_id, paiement_id } = req.params;

        const pivot = await modifierPaiement(commande_id, paiement_id, amount);

        if (!pivot)
            return res
                .status(404)
                .json({ error: "Paiement non associé à la commande" });

        res.json({ message: "Paiement mis à jour" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deletePaiement(req, res) {
    try {
        const { commande_id, paiement_id } = req.params;

        await supprimerPaiement(commande_id, paiement_id);

        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function cloture(req, res) {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande)
            return res.status(404).json({ error: "Commande non trouvée" });

        const solde = await calculerSolde(commande);

        if (solde.restant > 0)
            return res.status(400).json({
                error: "Solde restant, impossible de clôturer",
                restant: solde.restant
            });

        commande.status = "fini";
        await commande.save();

        res.json({ message: "Commande clôturée" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
