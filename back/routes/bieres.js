import express from 'express';
import Biere from '../models/biere.js';
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

// Liste de ttes les bieres
router.get('/', async (req, res) => {
    try {
        const biere = await Biere.findAll();
            res.json(biere);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Détail d'une bière
router.get('/:id', async (req, res) => {
    try {
        const biere = await Biere.findByPk(req.params.id);
        if (!biere) 
            return res.status(404).json({ error: 'Bière non trouvée' });
        res.json(biere);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Modifier une bière
router.put('/:id', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
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
router.delete('/:id', authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), async (req, res) => {
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



export default router;
