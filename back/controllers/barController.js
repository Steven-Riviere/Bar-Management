import * as service from "../services/barService.js";

function validateBar(data) {
  const { name, address, postalCode, city, tel, active } = data;

  if (!name || name.trim().length < 2 || name.trim().length > 60) {
    return "Le nom du bar doit contenir entre 2 et 60 caractères.";
  }

  if (!address || address.trim().length < 5) {
    return "L'adresse est obligatoire (au moins 5 caractères).";
  }

  if (!postalCode || !/^\d{5}$/.test(postalCode)) {
    return "Le code postal doit contenir 5 chiffres (ex: 75001).";
  }

  if (!city || city.trim().length < 2) {
    return "La ville est obligatoire.";
  }

  if (!tel || !/^(\+33|0)[1-9](\s?\d{2}){4}$/.test(tel)) {
    return "Le numéro de téléphone doit être au format français (ex: 01 23 45 67 89).";
  }

  return null;
}

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
    if (validationError) {
      return res.status(400).json({ error: validationError });
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
