import * as service from "../services/paiementService";

export async function getAll(req,res) {
    try {
        const payment = await service.getAllPayments();
        res.json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req,res) {
    try {
        const payment = await service.getPaymentById(req.params.id);
        if(!payment)
            return res.status(404).json({error: "paiement non trouvé"});
        res.json(payment);
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

        const newPaiement = await service.createPayment(req.body);
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
        const payment = await service.updatePayment(req.params.id, req.body);

        if(!payment)
            return res.status(404).json({error: 'paiement non trouvé'});
        res.json(payment);

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
        const payment = await service.disablePayment(req.params.id);
        if (!payment)
            return res.status(404).json({ error: "paiement non trouvé" });

        res.json({ message: "Méthode de paiement désactivée", payment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function enable(req, res) {
    try {
        const payment = await service.enablePayment(req.params.id);
        if (!payment)
            return res.status(404).json({ error: "paiement non trouvé" });

        res.json({ message: "Méthode de paiement réactivé", payment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
