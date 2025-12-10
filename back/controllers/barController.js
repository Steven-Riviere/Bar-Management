import * as service from "../services/barService";

export async function getAll(req,res) {
    try {
        const bar = await service.findAllBars();
        res.json(bar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req,res) {
    try {
        const bar = await service.findBarByPk(req.params.id);
        if(!bar)
            return res.status(404).json({error: "Bar non trouvé"});
        res.json(bar);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function create(req,res) {
    try {
        const newBar = await service.createBar(req.body);
        res.status(201).json(newBar);
    }catch (err) {
        res.status(500).json({error : err.message});
    }
}

export async function update(req,res) {
    try {
        const bar = await service.updateBar(req.params.id, req.body);
        if(!bar)
            return res.status(404).json({error: 'Bar non trouvé'});
        res.json(bar);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function remove(req,res) {
    try {
        const success = await service.deleteBar(req.params.id);
        if(!success)
            return res.status(404).json({error : 'Bar non trouvé'});
        res.status(204).end();
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

// Gestion des bières
export async function getBieres(req, res) {
    try {
        const bieres = await service.getBieres(req.params.bar_id);
        if (!bieres) return res.status(404).json({ error: "Bar non trouvé" });
        res.json(bieres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function addBiere(req, res) {
    try {
        const biere = await service.addBiere(req.params.bar_id, req.body);
        if (!biere) return res.status(404).json({ error: "Bar non trouvé" });
        res.status(201).json(biere);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function removeBiere(req, res) {
    try {
        const success = await service.removeBiere(req.params.bar_id, req.params.biere_id);
        if (!success) return res.status(404).json({ error: "Bar ou bière non trouvé" });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}