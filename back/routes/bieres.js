import express from 'express';
import Biere from '../models/biere.js';
import Bar from "../models/bar";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

// Les bières d'un bar
router.get('/bars/:bar_id/bieres', async (req, res) => {
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

// Liste de ttes les bieres
router.get('/bieres', async (req, res) => {
    try {
        const biere = await Biere.findAll();
            res.json(biere);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Détail d'une bière
router.get('/bieres/:id', async (req, res) => {
    try {
        const biere = await Biere.findByPk(req.params.id);
        if (biere) {
            res.json(biere);
        } else {
            res.status(404).json({ error: 'Bière non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter une bière à un bar
router.post('/bars/:bar_id/bieres', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
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

// Modifier une bière
router.put('/bieres/:id', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
    try {
        const biere = await Biere.findByPk(req.params.id);

        if (!biere) {
            return res.status(404).json({ error: "Bière non trouvée" });
        }
        await biere.update(req.body);
        res.json(biere);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer une bière
router.delete('/bieres/:id', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
    try {
        const biere = await Biere.findByPk(req.params.id);

        if (!biere) {
            return res.status(404).json({ error: "Bière non trouvée" });
        }

        await biere.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Retirer une biere d'un bar sans la supprimer
router.delete("/bars/:bar_id/bieres/:biere_id", authenticate, authorization("ADMIN", "GERANT", "BARMAN"), async (req, res) => {
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
