import express from "express";
import Commande from "../models/commande";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

// Liste des commandes
router.get('/', authenticate, async (req,res) => {
    try {
        const commande = await Commande.findAll();
        res.json(commande);
    } catch(err) {
        res.status(500).json({error : err.message});
    }
})

//Détail d'une commande
router.get('/:id', authenticate, async(req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if(commande) {
            res.json(commande);
        } else {
            res.status(404).json({error: 'Commande non trouvée'});
        }
    } catch(err) {
        res.status(500).json({error : err.message});
    }
});

// Ajouter une commande
router.post('/', authenticate, async (req, res) => {
    try {
        const newCommande = await Commande.create(req.body);
        res.status(201).json(newCommande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre a jour une commande
router.put('/:id', authenticate, async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            await commande.update(req.body);
            res.json(commande);
        } else {
            res.status(404).json({ error: 'Commande non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer une commande
router.delete('/:id', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            await commande.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Commande non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;