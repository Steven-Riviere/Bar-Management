import Table from "../models/table.js";
import Bar from "../models/bar.js";

export async function getAllTables() {
    return Table.findAll({
        include: Bar
    });
}

export async function getTableById(id) {
    return Table.findByPk(id, {
        include: Bar
    });
}

export async function createTable(data) {
    const bar = await Bar.findByPk(data.bar_id);
    if (!bar) throw new Error("Bar non trouvé");

    return Table.create(data);
}

export async function updateTable(id, data) {
    const table = await Table.findByPk(id);
    if (!table) throw new Error("Table non trouvée");

    return table.update(data);
}

export async function deactivateTable(id) {
  const table = await Table.findByPk(id);
  if (!table) return null;
  table.active = false;

  await table.save();
  return table;
}

export async function enableTable(id) {
    const table = await Table.findByPk(id);
    if(!table) return null;
    table.active = true;

    await table.save();
    return table;
}

export async function getTablesByBar(bar_id) {
    return Table.findAll({ where: { bar_id } });
}
