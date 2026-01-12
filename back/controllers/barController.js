import * as service from "../services/barService";

export async function getAll(req,res) {
    try {
        const bar = await service.getAllBars();
        res.json(bar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getOne(req,res) {
    try {
        const bar = await service.getBarById(req.params.id);
        if(!bar)
            return res.status(404).json({error: "Bar non trouvé"});
        res.json(bar);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function create(req,res) {
    try {
        const newBar = await service.createBar(req.body);
        res.status(201).json(newBar);
    }catch (err) {
        res.status(500).json({error : err.message});
    }
}

export async function update(req,res) {
    try {
        const bar = await service.updateBar(req.params.id, req.body);
        if(!bar)
            return res.status(404).json({error: 'Bar non trouvé'});
        res.json(bar);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export async function deactivateBar(req,res) {
  const bar = await service.disableBar(req.params.id);
  if(!bar) return res.status(404).json({ error: 'Bar non trouvé' });
  res.json(bar);
}

export async function restoreBar(req, res) {
  try {
    const bar = await service.enableBar(req.params.id);
    if (!bar) return res.status(404).json({ error: 'Bar non trouvé' });

    res.json({ message: 'Bar réactivé', bar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
