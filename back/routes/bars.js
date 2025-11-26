import express from "express";
import Bar from "../models/bar";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const bar = await Bar.findAll();
        res.json(bar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', authenticate, async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.id);
        if (bar) {
            res.json(bar);
        } else {
            res.status(404).json({ error: 'Bar not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticate, authorization('ADMIN', 'GERANT'), async (req, res) => {
    try {
        const newBar = await Bar.create(req.body);
        res.status(201).json(newBar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', authenticate, authorization('ADMIN', 'GERANT'), async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.id);
        if (bar) {
            await bar.update(req.body);
            res.json(bar);
        } else {
            res.status(404).json({ error: 'Bar not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authenticate, authorization('ADMIN', 'GERANT'), async (req, res) => {
    try {
        const bar = await Bar.findByPk(req.params.id);
        if (bar) {
            await bar.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Bar not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;