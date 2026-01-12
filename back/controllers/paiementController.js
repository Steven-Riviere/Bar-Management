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
        if (!req.body.method) {
            return res.status(400).json({ error: "Ajout d'un nom de paiement obligatoire" });
        }

        //tout stocker en majuscules
        req.body.method = req.body.method.trim().toUpperCase();

        const newPaiement = await service.createPaiement(req.body);
        res.status(201).json(newPaiement);

    }catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                error: "Cette méthode de paiement existe déjà"
            });
        }

        res.status(500).json({error : err.message});
    }
}

export async function update(req,res) {
    try {
        if (req.body.method) {
            req.body.method = req.body.method.trim().toUpperCase();
        }
        const paiement = await service.updatePaiement(req.params.id, req.body);

        if(!paiement)
            return res.status(404).json({error: 'paiement non trouvé'});
        res.json(paiement);

    } catch(err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                error: "Cette méthode de paiement existe déjà"
            });
        }

        res.status(500).json({error: err.message});
    }
}

export async function deactivate(req, res) {
    try {
        const paiement = await service.disablePaiement(req.params.id);
        if (!paiement)
            return res.status(404).json({ error: "paiement non trouvé" });

        res.json({ message: "Méthode de paiement désactivée", paiement });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function restore(req, res) {
    try {
        const paiement = await service.enablePaiement(req.params.id);
        if (!paiement)
            return res.status(404).json({ error: "paiement non trouvé" });

        res.json({ message: "Méthode de paiement réactivé", paiement });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
