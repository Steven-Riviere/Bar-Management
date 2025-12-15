import * as service from "../services/barService";

export async function getAll(req,res) {
    try {
        const bar = await service.getAllBars();
        res.json(bar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req,res) {
    try {
        const bar = await service.getBarById(req.params.id);
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