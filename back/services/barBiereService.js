import Bar from "../models/bar.js";
import Biere from "../models/biere.js";
import BarBiere from "../models/barBiere.js";

export async function getBeersForBar(bar_id) {
    const bar = await Bar.findByPk(bar_id, {
        include: {
            model: Biere,
            through: { attributes: ["price", "stock"] }
        }
    });

    return bar ? bar.Bieres : null;
}

export async function addBeerToBar(bar_id, biere_id, data) {
    const bar = await Bar.findByPk(bar_id);
    const beer = await Biere.findByPk(biere_id);

    if (!bar || !beer) return null;

    await BarBiere.create({
        bar_id,
        biere_id,
        price: data.price,
        stock: 0,
        active: true,
    });

    return getBeersForBar(bar_id);
}

export async function updateBeerInBar(bar_id, biere_id, data) {
    const pivot = await BarBiere.findOne({ where: { bar_id, biere_id } });
    if (!pivot) return null;

    if(data.stock !== undefined) {
        throw new Error("Le stock ne peut pas être modifié ici.")
    }
    await pivot.update(data);
    return pivot;
}

export async function deactivateBeerFromBar(bar_id, biere_id, userId) {
    const pivot = await BarBiere.findOne({where: { bar_id, biere_id }});
    if (!pivot) return null;

    pivot.active = false;
    pivot.disabled_at = new Date();
    pivot.disabled_by = userId;

    await pivot.save();
    return pivot;
}

export async function enableBeerForBar(bar_id, biere_id, userId) {
    const pivot = await BarBiere.findOne({where: { bar_id, biere_id }});
    if (!pivot) return null;

    pivot.active = true;
    pivot.disabled_at = null;
    pivot.disabled_by = null;

    await pivot.save();
    return pivot;
}
