import express from "express";
import Bar from "../models/bar";
import Biere from "../models/biere.js";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

//Liste des bars
router.get('/', authenticate, async (req, res) => {
    try {
        const bar = await Bar.findAll();
        res.json(bar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Détail d'un bar
router.get('/:id', authenticate, async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.id);
        if (bar) {
            res.json(bar);
        } else {
            res.status(404).json({ error: 'Bar non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter un bar
router.post('/', authenticate, authorization('ADMIN', 'GERANT'), async (req, res) => {
    try {
        const newBar = await Bar.create(req.body);
        res.status(201).json(newBar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre a jour un bar
router.put('/:id', authenticate, authorization('ADMIN', 'GERANT'), async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.id);
        if (bar) {
            await bar.update(req.body);
            res.json(bar);
        } else {
            res.status(404).json({ error: 'Bar non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer un bar
router.delete('/:id', authenticate, authorization('ADMIN', 'GERANT'), async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.id);
        if (bar) {
            await bar.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Bar non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupère les bières d'un bar
router.get('/:bar_id/bieres', async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.bar_id, {
            include: Biere
        });
        if (!bar) {
            return res.status(404).json({ error: "Bar non trouvé" });
        }
        res.json(bar.Bieres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter une bière à un bar
router.post('/:bar_id/bieres', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.bar_id);
        if (!bar) {
            return res.status(404).json({ error: "Bar non trouvé" });
        }
        const newBiere = await Biere.create(req.body);
        // liaison dans table pivot
        await bar.addBiere(newBiere);
        res.status(201).json(newBiere);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Retirer une biere d'un bar sans la supprimer
router.delete("/:bar_id/bieres/:biere_id", authenticate, authorization("ADMIN", "GERANT", "BARMAN"), async (req, res) => {
        try {
            const bar = await Bar.findByPk(req.params.bar_id);
            if (!bar) return res.status(404).json({ error: "Bar non trouvé" });

            const biere = await Biere.findByPk(req.params.biere_id);
            if (!biere) return res.status(404).json({ error: "Bière non trouvée" });

            await bar.removeBiere(biere);

            res.status(204).end();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
});

export default router;


