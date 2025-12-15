import * as service from "../services/commandeService.js";

export async function getAll(req, res) {
    try {
        const commandes = await service.getAllCommandes();
        res.json(commandes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req, res) {
    try {
        const commande = await service.getCommande(req.params.id);
        if (!commande) return res.status(404).json({ error: "Commande non trouvée" });
        res.json(commande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function create(req, res) {
    try {
        const commande = await service.createCommande(req.body);
        res.status(201).json(commande);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const commande = await service.updateCommande(req.params.id, req.body);
        res.json(commande);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function remove(req, res) {
    try {
        await service.removeCommande(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// paiement d'une commande
export async function addPaiement(req, res) {
    try {
        const { method, amount } = req.body;
        const commande = await service.getCommande(req.params.id);
        if (!commande) return res.status(404).json({ error: "Commande non trouvée" });

        const recap = await service.ajouterPaiement(commande, method, amount);
        res.status(201).json(recap);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function modifyPaiement(req, res) {
    try {
        const { amount } = req.body;
        const { commande_id, paiement_id } = req.params;

        const pivot = await service.modifierPaiement(commande_id, paiement_id, amount);
        if (!pivot) return res.status(404).json({ error: "Paiement non associé à la commande" });

        res.json({ message: "Paiement mis à jour", nouveau_montant: amount });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deletePaiement(req, res) {
    try {
        const { commande_id, paiement_id } = req.params;
        await service.supprimerPaiement(commande_id, paiement_id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
//biere d'une commande
export async function addBiere(req, res) {
    try {
        const { biere_id, quantity} = req.body;
        const commande = await service.getCommande(req.params.id);
        if (!commande) return res.status(404).json({ error: "Commande non trouvée" });

        const updated = await service.ajouterBiere(commande, biere_id, quantity);
        res.status(201).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function modifyBiere(req, res) {
    try {
        const { quantity} = req.body;
        const { commande_id, biere_id } = req.params;

        const updated = await service.modifierBiere(commande_id, biere_id, quantity);
        if (!updated) return res.status(404).json({ error: "Bière non associée à la commande" });

        res.json({ message: "Bière mise à jour", data: updated });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteBiere(req, res) {
    try {
        const { commande_id, biere_id } = req.params;
        await service.supprimerBiere(commande_id, biere_id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// finir le paiement de la commande
export async function cloture(req, res) {
    try {
        const commande = await service.getCommande(req.params.id);
        if (!commande) return res.status(404).json({ error: "Commande non trouvée" });

        const recap = await service.calculerSolde(commande);
        if (recap.restant > 0) {
            return res.status(400).json({
                error: "Solde restant, impossible de clôturer",
                restant: recap.restant
            });
        }

        commande.status = "fini";
        await commande.save();
        res.json({ message: "Commande clôturée", status: commande.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
