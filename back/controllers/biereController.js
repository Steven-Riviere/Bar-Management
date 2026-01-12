import * as service from "../services/biereService";

export async function getAll(req,res) {
    try {
        const list = await service.getAllBieres();
        res.json(list);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function getOne(req,res) {
    try {
        const biere = await service.getBiereById(req.params.id);
        if(!biere) return res.status(404).json({error : "Bière non trouvée"});
        res.json(biere);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function create(req, res) {
    try {
        const biere = await service.createBiere(req.body);
        res.status(201).json(biere);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const biere = await service.updateBiere(req.params.id, req.body);
        if (!biere) return res.status(404).json({ error: "Bière non trouvée" });
        res.json(biere);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deactivate(req, res) {
  try {
    const biere = await service.disableBiere(req.params.id);
    if (!biere)
      return res.status(404).json({ error: "Bière non trouvée" });

    res.json({ message: "Bière désactivée", biere });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function restore(req, res) {
  try {
    const biere = await service.enableBiere(req.params.id);
    if (!biere)
      return res.status(404).json({ error: "Bière non trouvée" });

    res.json({ message: "Bière réactivée", biere });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}