import express from 'express';
import Biere from '../models/biere.js';
import Bar from "../models/bar";
import BarBiere from '../models/barBiere.js';
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

//Récupérer toutes les bieres d'un bar avec prix et stock
router.get('/bars/:bar_id', authenticate, async(req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.bar_id, {
            include: {
                model: Biere,
                through: {
                    attributes: ["prix", "stock"]
                }
            }
        });
        if(!bar) return res.status(404).json({error: "Bar non trouvé"});

        res.json(bar.Bieres);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// Récupérer stock d'une biere precise avec un bar précis
router.get("/bars/:bar_id/:biere_id", authenticate, async (req, res) => {
    try {
        const link = await BarBiere.findOne({
            where: {
                BarId: req.params.bar_id,
                BiereId: req.params.biere_id
            }
        });

        if (!link) {
            return res.status(404).json({ error: "Cette bière n'est pas disponible dans ce bar" });
        }

        res.json(link);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Ajouter une biere au bar mais avec un prix et stock
router.post('/bars/:bar_id', authenticate, authorization("ADMIN", "GERANT", "BARMAN"), async(req,res) => {
    try {
        const { biere_id, prix, stock } = req.body;

        const bar = await Bar.findByPk(req.params.bar_id);
        if (!bar) return res.status(404).json({ error: "Bar non trouvé" });

        const biere = await Biere.findByPk(biere_id);
        if (!biere) return res.status(404).json({ error: "Bière non trouvée" });

        // Associer via table pivot
        await bar.addBiere(biere, {
            through: { prix, stock }
        });

        res.status(201).json({ message: "Bière ajoutée au bar avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Mettre a jour le stock ou le prix d'une biere dans le bar
router.put("/bars/:bar_id/:biere_id", authenticate, authorization("ADMIN", "GERANT", "BARMAN"), async (req, res) => {
    try {
        const link = await BarBiere.findOne({
            where: {
                BarId: req.params.bar_id,
                BiereId: req.params.biere_id
            }
        });

        if (!link)
            return res.status(404).json({ error: "Cette bière n'est pas dans ce bar" });

        await link.update(req.body);

        res.json({ message: "Stock/prix mis à jour", data: link });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Retirer complétement une biere du bar (avec prix et stocks)
router.delete("/bars/:bar_id/:biere_id", authenticate, authorization("ADMIN", "GERANT", "BARMAN"), async(req,res) => {
    try {
        const link = await BarBiere.findOne({
            where: {
                BarId: req.params.bar_id,
                BiereId: req.params.biere_id
            }
        });

        if (!link)
            return res.status(404).json({ error: "Cette bière n'est pas associée au bar" });

        await link.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;