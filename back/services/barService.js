import Bar from "../models/bar.js";

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

export async function patchBar(id, data) {
  const bar = await Bar.findByPk(id);
  if (!bar) return null;

  if (typeof data.active === "boolean") {
    bar.active = data.active;
  }

  await bar.save();
  return bar;
}
