import Bar from "../models/bar.js";
import Biere from "../models/biere.js";
import BarBiere from "../models/barBiere.js";

export async function getBeersForBar(barId) {
    const bar = await Bar.findByPk(barId, {
        include: {
            model: Biere,
            through: { attributes: ["price", "stock"] }
        }
    });

    return bar ? bar.Bieres : null;
}

export async function addBeerToBar(barId, biereId, data) {
    const bar = await Bar.findByPk(barId);
    const beer = await Biere.findByPk(biereId);

    if (!bar || !beer) return null;

    await BarBiere.create({
        barId,
        biereId,
        price: data.price,
        stock: 0,
        active: true,
    });

    return getBeersForBar(barId);
}

export async function updateBeerInBar(barId, biereId, data) {
    const pivot = await BarBiere.findOne({ where: { barId, biereId } });
    if (!pivot) return null;

    if(data.stock !== undefined) {
        throw new Error("Le stock ne peut pas être modifié ici.")
    }
    await pivot.update(data);
    return pivot;
}

export async function deactivateBeerFromBar(barId, biereId, userId) {
    const pivot = await BarBiere.findOne({where: { barId, biereId }});
    if (!pivot) return null;

    pivot.active = false;
    pivot.disabled_at = new Date();
    pivot.disabled_by = userId;

    await pivot.save();
    return pivot;
}

export async function enableBeerForBar(barId, biereId, userId) {
    const pivot = await BarBiere.findOne({where: { barId, biereId }});
    if (!pivot) return null;

    pivot.active = true;
    pivot.disabled_at = null;
    pivot.disabled_by = null;

    await pivot.save();
    return pivot;
}
