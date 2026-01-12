import Paiement from "../models/paiement";

export async function getAllPaiements() {
    return Paiement.findAll({
        where: { active: true }
    });
}


export async function getPaiementById(id) {
    return Paiement.findByPk(id);
}

export async function createPaiement(data) {
    return Paiement.create(data);
}

export async function updatePaiement(id, data) {
    const paiement = await Paiement.findByPk(id);
    if(!paiement) return null;
    
    await paiement.update(data);
    return paiement;
}

export async function disablePaiement(id) {
  const paiement = await Paiement.findByPk(id);
  if (!paiement) return null;
  paiement.active = false;

  await paiement.save();
  return paiement;
}

export async function enablePaiement(id) {
  const paiement = await Paiement.findByPk(id);
  if (!paiement) return null;
  paiement.active = true;

  await paiement.save();
  return paiement;
}