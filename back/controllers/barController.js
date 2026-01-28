import * as service from "../services/barService.js";
import { validateBar } from "../validators/barValidator.js";

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

export async function create(req, res) {
  try {
    const validationError = validateBar(req.body);
    if(validationError) {
      return res.status(400).json({error: validationError});
    }

    const newBar = await service.createBar(req.body);
    res.status(201).json(newBar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const validationError = validateBar(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const bar = await service.updateBar(req.params.id, req.body);
    if (!bar) return res.status(404).json({ error: "Bar non trouvé" });
    res.json(bar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function patch(req, res) {
  try {
    const bar = await service.patchBar(req.params.id, req.body);
    if (!bar) return res.status(404).json({ error: "Bar non trouvé" });

    res.json(bar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
