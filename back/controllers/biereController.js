import * as service from "../services/biereService";

export async function getAll(req,res) {
    try {
        const list = await service.getAllBeers();
        res.json(list);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function getOne(req,res) {
    try {
        const beer = await service.getBeerById(req.params.id);
        if(!beer) return res.status(404).json({error : "Bière non trouvée"});
        res.json(beer);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function create(req, res) {
    try {
        const beer = await service.createBeer(req.body);
        res.status(201).json(beer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const beer = await service.updateBeer(req.params.id, req.body);
        if (!beer) return res.status(404).json({ error: "Bière non trouvée" });
        res.json(beer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deactivate(req, res) {
  try {
    const beer = await service.disableBeer(req.params.id);
    if (!beer)
      return res.status(404).json({ error: "Bière non trouvée" });

    res.json({ message: "Bière désactivée", beer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function restore(req, res) {
  try {
    const beer = await service.enableBeer(req.params.id);
    if (!beer)
      return res.status(404).json({ error: "Bière non trouvée" });

    res.json({ message: "Bière réactivée", beer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}