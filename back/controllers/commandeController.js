import * as service from "../services/commandeService.js";

export async function getAll(req, res) {
    try {
        const orders = await service.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req, res) {
    try {
        const order = await service.getOrder(req.params.id);
        if (!order) return res.status(404).json({ error: "ordernon trouvée" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function create(req, res) {
    try {
        const order = await service.createOrder(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const order= await service.updateOrder(req.params.id, req.body);
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function remove(req, res) {
    try {
        await service.deleteOrder(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// paiement d'une commande
export async function addPayment(req, res) {
    try {
        const { method, amount } = req.body;
        const order= await service.getOrder(req.params.id);
        if (!order) return res.status(404).json({ error: "commande non trouvée" });

        const recap = await service.addPayment(order, method, amount);
        res.status(201).json(recap);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function updatePayment(req, res) {
    try {
        const { amount } = req.body;
        const { commande_id, paiement_id } = req.params;

        const pivot = await service.updatePayment(commande_id, paiement_id, amount);
        if (!pivot) return res.status(404).json({ error: "Paiement non associé à la commande" });

        res.json({ message: "Paiement mis à jour", nouveau_montant: amount });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deletePayment(req, res) {
    try {
        const { commande_id, paiement_id } = req.params;
        await service.deletePayment(commande_id, paiement_id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
//biere d'une commande
export async function addBeer(req, res) {
    try {
        const { biere_id, quantity} = req.body;
        const order= await service.getOrder(req.params.id);
        if (!order) return res.status(404).json({ error: "Commande non trouvée" });

        const updated = await service.addBeer(order, biere_id, quantity);
        res.status(201).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function updateBeer(req, res) {
    try {
        const { quantity} = req.body;
        const { commande_id, biere_id } = req.params;

        const updated = await service.updateBeer(commande_id, biere_id, quantity);
        if (!updated) return res.status(404).json({ error: "Bière non associée à la commande" });

        res.json({ message: "Bière mise à jour", data: updated });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteBeer(req, res) {
    try {
        const { commande_id, biere_id } = req.params;
        await service.deleteBeer(commande_id, biere_id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// finir le paiement de la commande
export async function closeOrder(req, res) {
    try {
        const order= await service.getOrder(req.params.id);
        if (!order) return res.status(404).json({ error: "commande non trouvée" });

        const recap = await service.calculateBalance(order);
        if (recap.restant > 0) {
            return res.status(400).json({
                error: "Solde restant, impossible de clôturer",
                restant: recap.restant
            });
        }

        order.status = "fini";
        await order.save();
        res.json({ message: "commande clôturée", status: order.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
