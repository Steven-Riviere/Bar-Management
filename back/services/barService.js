import Bar from "../models/bar";
import Biere from "../models/biere";

export async function getAllBars() {
    return Bar.findAll();
}

export async function getBarById(id) {
    return Bar.findByPk(id);
}

export async function createBar(data) {
    return Bar.create(data);
}

export async function updateBar(id, data) {
    const bar = await Bar.findByPk(id);
    if(!bar) return null;
    await bar.update(data);
    return bar;
}

export async function deleteBar(id) {
    const bar = await Bar.findByPk(id);
    if(!bar) return null;
    await bar.destroy();
    return true;
}

// gestion des bieres d'un bar
export async function getBieres(bar_id) {
    const bar = await Bar.findByPk(bar_id, {include: Biere});
    if(!bar) return null;
    return bar.Bieres;
}

export async function addBiere(bar_id, biereData) {
    const bar = await Bar.findByPk(bar_id);
    if (!bar) return null;

    const biere = await Biere.create(biereData);
    await bar.addBiere(biere);
    return biere;
}

export async function removeBiere(bar_id, biere_id) {
    const bar = await Bar.findByPk(bar_id);
    if (!bar) return null;

    const biere = await Biere.findByPk(biere_id);
    if (!biere) return null;

    await bar.removeBiere(biere);
    return true;
}