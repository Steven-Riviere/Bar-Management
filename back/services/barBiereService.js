import Bar from "../models/bar.js";
import Biere from "../models/biere.js";
import BarBiere from "../models/barBiere.js";

export async function getBieresForBar(bar_id) {
    const bar = await Bar.findByPk(bar_id, {
        include: {
            model: Biere,
            through: { attributes: ["price", "stock"] }
        }
    });

    return bar ? bar.Bieres : null;
}

export async function addBiereToBar(bar_id, biere_id, data) {
    const bar = await Bar.findByPk(bar_id);
    const biere = await Biere.findByPk(biere_id);

    if (!bar || !biere) return null;

    await BarBiere.create({
        bar_id,
        biere_id,
        price: data.price,
        stock: data.stock,
        active: true,
    });

    return getBieresForBar(bar_id);
}

export async function updateBiereInBar(bar_id, biere_id, data) {
    const pivot = await BarBiere.findOne({ where: { bar_id, biere_id } });
    if (!pivot) return null;

    await pivot.update(data);
    return pivot;
}

export async function disableBiereFromBar(bar_id, biere_id, userId) {
    const pivot = await BarBiere.findOne({where: { bar_id, biere_id }});
    if (!pivot) return null;

    pivot.active = false;
    pivot.disabled_at = new Date();
    pivot.disabled_by = userId;

    await pivot.save();
    return pivot;
}

export async function enableBiereForBar(bar_id, biere_id, userId) {
    const pivot = await BarBiere.findOne({where: { bar_id, biere_id }});
    if (!pivot) return null;

    pivot.active = true;
    pivot.disabled_at = null;
    pivot.disabled_by = null;

    await pivot.save();
    return pivot;
}
