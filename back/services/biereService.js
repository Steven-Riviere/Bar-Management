import Biere from "../models/biere";

export async function getAllBieres() {
    return Biere.findAll();
}

export async function getBiereById(id) {
    return Biere.findByPk(id);
}

export async function createBiere(data) {
    return Biere.create(data);
}

export async function updateBiere(id, data) {
    const biere = await Biere.findByPk(id);
    if(!biere) return null;
    await biere.update(data);
    return biere;
}

export async function disableBiere(id) {
  const biere = await Biere.findByPk(id);
  if (!biere) return null;
  biere.active = false;

  await biere.save();
  return biere;
}

export async function enableBiere(id) {
  const biere = await Biere.findByPk(id);
  if (!biere) return null;
  biere.active = true;

  await biere.save();
  return biere;
}