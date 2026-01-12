import Bar from "../models/bar";

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

export async function disableBar(id) {
  const bar = await Bar.findByPk(id);
  if (!bar) return null;
  bar.active = false;
  await bar.save();
  return bar;
}

export async function enableBar(id) {
  const bar = await Bar.findByPk(id);
  if (!bar) return null;
  bar.active = true;
  await bar.save();
  return bar;
}