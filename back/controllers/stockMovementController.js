import * as service from "../services/stockMovement.js";

export async function create (req, res) {
    try {
        const movement = await service.createMovement(req.body);
        res.status(201).json(movement);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}