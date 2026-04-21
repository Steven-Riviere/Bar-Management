import * as service from "../services/barBiereService.js";

export async function list(req, res) {
    try {
        const beers = await service.getBeersForBar(req.params.barId);
        if (!beers) return res.status(404).json({ error: "Bar non trouvé" });
        res.json(beers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function add(req, res) {
    try {
        const result = await service.addBeerToBar(
            req.params.barId,
            req.params.biereId,
            req.body
        );

        if (!result) return res.status(404).json({ error: "Bar ou bière introuvable" });

        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const result = await service.updateBeerInBar(
            req.params.barId,
            req.params.biereId,
            req.body
        );

        if (!result) return res.status(404).json({ error: "Association non trouvée" });

        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deactivateBeerFromBar(req, res) {
  const { barId, biereId } = req.params;
  try {
    const removed = await service.disableBiereFromBar(barId, biereId, req.user.id);
    if (!removed)
      return res.status(404).json({ error: "Lien bar/bière introuvable" });

    res.json({ message: "Bière retirée du bar" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function restoreBeerForBar(req, res) {
  const { bar_id, biere_id } = req.params;
  try {
    const restored = await service.enableBeerForBar(bar_id, biere_id, req.user.id);
    if (!restored)
      return res.status(404).json({ error: "Lien bar/bière introuvable" });

    res.json({ message: "Bière remise en vente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
