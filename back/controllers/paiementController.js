import * as service from "../services/paiementService";

export async function getAll(req,res) {
    try {
        const paiement = await service.getAllPaiements();
        res.json(paiement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req,res) {
    try {
        const paiement = await service.getPaiementById(req.params.id);
        if(!paiement)
            return res.status(404).json({error: "paiement non trouvé"});
        res.json(paiement);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function create(req,res) {
    try {
        const newPaiement = await service.createPaiement(req.body);
        res.status(201).json(newPaiement);
    }catch (err) {
        res.status(500).json({error : err.message});
    }
}

export async function update(req,res) {
    try {
        const paiement = await service.updatePaiement(req.params.id, req.body);
        if(!paiement)
            return res.status(404).json({error: 'paiement non trouvé'});
        res.json(paiement);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function remove(req,res) {
    try {
        const success = await service.deletePaiement(req.params.id);
        if(!success)
            return res.status(404).json({error : 'paiement non trouvé'});
        res.status(204).end();
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}