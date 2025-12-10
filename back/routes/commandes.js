import express from "express";
import Commande from "../models/commande";
import Table from "../models/table";
import Bar from "../models/bar";
import Paiement from "../models/paiement";
import CommandePaiement from "../models/commandePaiement.js";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

// Liste des commandes (en incluant table et bar)
router.get('/', authenticate, async (req,res) => {
    try {
        const commande = await Commande.findAll({
            include: {
                model: Table,
                include: Bar
            }
        });
        res.json(commande);
    } catch(err) {
        res.status(500).json({error : err.message});
    }
})

//Détail d'une commande (en incluant table et bar)
router.get('/:id', authenticate, async(req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id, {
            include: {
                model: Table,
                include: Bar
            }
        });
        if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });
            res.json(commande);
    } catch(err) {
        res.status(500).json({error : err.message});
    }
});

// Ajouter une commande (avec sa table)
router.post('/', authenticate, async (req, res) => {
    try {
        const { table_id, price, date, status } = req.body;

        // Vérifie que la table existe
        const table = await Table.findByPk(table_id);
        if (!table) return res.status(404).json({ error: "Table non trouvée" });

        const newCommande = await Commande.create({
            table_id,
            price,
            date,
            status
        });
        res.status(201).json(newCommande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre a jour une commande
router.put('/:id', authenticate, async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });

        // Si table_id est modifié, vérifie qu'elle existe
        if (req.body.table_id) {
            const table = await Table.findByPk(req.body.table_id);
            if (!table) return res.status(404).json({ error: "Table non trouvée" });
        }

        await commande.update(req.body);
        res.json(commande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer une commande
router.delete('/:id', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });

        await commande.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter un paiement a une commande (montant inclus)
router.post('/:commande_id', authenticate, async (req, res) => {
    try {
        const {method, amount} = req.body;
        const commande = await Commande.findByPk(req.params.commande_id);
        if (!commande) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }
        const newPaiement = await Paiement.create(method);
        // liaison dans table pivot
        await commande.addPaiement(newPaiement, {through : {amount} });
        res.status(201).json({ newPaiement, amount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Supprimer un mode de paiement sans supprimer son historique
router.delete('/:commande_id/:paiement_id', authenticate, authorization('ADMIN', 'GERANT'), async(req,res) => {
    try {
        const paiement = await Paiement.findByPk(req.params.paiement_id);
        if(!paiement) return res.status(404).json({error: 'Mode de paiement non trouvé'});

        const commande = await Commande.findByPk(req.params.commande_id);
        if(!commande) return res.status(404).json({error: 'Commande non trouvée'});

        await commande.removePaiement(paiement);
        res.status(204).end();
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

export default router;