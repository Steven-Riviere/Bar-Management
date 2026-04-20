import * as service from "../services/analyticsService.js";

export async function globalIncome(req, res) {
    try {
        const data = await service.getGlobalIncome();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function incomeByBar(req, res) {
    try {
        const data = await service.getIncomeByBar();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function topBeers(req, res) {
    try {
        const data = await service.getTopBeers(req.query.limit);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function salesByPeriod(req, res) {
    try {
        const { start, end } = req.query;
        const data = await service.getSalesByPeriod(start, end);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function stockUsage(req, res) {
    try {
        const data = await service.getStockUsage();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}