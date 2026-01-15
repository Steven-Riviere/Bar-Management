import Biere from "../models/biere.js";

export async function getAllBeers() {
    return Biere.findAll();
}

export async function getBeerById(id) {
    return Biere.findByPk(id);
}

export async function createBeer(data) {
    return Biere.create(data);
}

export async function updateBeer(id, data) {
    const beer = await Biere.findByPk(id);
    if(!beer) return null;
    await beer.update(data);
    return beer;
}

export async function disableBeer(id) {
  const beer = await Biere.findByPk(id);
  if (!beer) return null;
  beer.active = false;

  await beer.save();
  return beer;
}

export async function enableBeer(id) {
  const beer = await Biere.findByPk(id);
  if (!beer) return null;
  beer.active = true;

  await beer.save();
  return beer;
}