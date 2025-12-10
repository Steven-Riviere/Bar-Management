import express from "express";
import Paiement from "../models/paiement";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

//Liste des modes de paiements
router.get('/', authenticate, async(req, res) => {
    try {
        const paiement = await Paiement.findAll();
        res.json(paiement);
    } catch(err) {
        res.status(500).json({error : err.message});
    }
});

//Ajouter un mode de paiement
router.post('/', authenticate, authorization('ADMIN', 'GERANT'), async (req,res) => {
    try {
        const newPaiement = await Paiement.create(req.body);
        res.status(201).json(newPaiement);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// Mettre a jour un mode de paiement
router.put('/:id', authenticate, authorization('ADMIN', 'GERANT'), async(req,res) => {
    try {
        const paiement = await Paiement.findByPk(req.params.id);
        if (!paiement) return res.status(404).json({ error: 'Mode de paiement non trouvé' });

        await paiement.update(req.body);
        res.json(paiement);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


export default router;