import * as service from "../services/barBiereService.js";

export async function list(req, res) {
    try {
        const bieres = await service.getBieresForBar(req.params.bar_id);
        if (!bieres) return res.status(404).json({ error: "Bar non trouvé" });
        res.json(bieres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function add(req, res) {
    try {
        const result = await service.addBiereToBar(
            req.params.bar_id,
            req.params.biere_id,
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
        const result = await service.updateBiereInBar(
            req.params.bar_id,
            req.params.biere_id,
            req.body
        );

        if (!result) return res.status(404).json({ error: "Association non trouvée" });

        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deactivateBiereFromBar(req, res) {
  const { bar_id, biere_id } = req.params;
  try {
    const removed = await service.disableBiereFromBar(bar_id, biere_id, req.user.id);
    if (!removed)
      return res.status(404).json({ error: "Lien bar/bière introuvable" });

    res.json({ message: "Bière retirée du bar" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function restoreBiereForBar(req, res) {
  const { bar_id, biere_id } = req.params;
  try {
    const restored = await service.enableBiereForBar(bar_id, biere_id, req.user.id);
    if (!restored)
      return res.status(404).json({ error: "Lien bar/bière introuvable" });

    res.json({ message: "Bière remise en vente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
