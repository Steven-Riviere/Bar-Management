import * as service from "../services/tableService.js";

export async function getAll(req, res) {
    try {
        const tables = await service.getAllTables();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req, res) {
    try {
        const table = await service.getTableById(req.params.id);
        if (!table) return res.status(404).json({ error: "Table non trouvée" });
        res.json(table);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function create(req, res) {
    try {
        const table = await service.createTable(req.body);
        res.status(201).json(table);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const table = await service.updateTable(req.params.id, req.body);
        res.json(table);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function remove(req, res) {
    try {
        await service.deleteTable(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
