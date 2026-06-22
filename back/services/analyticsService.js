import Commande from "../models/commande.js";
import Biere from "../models/biere.js";
import BiereCommande from "../models/biereCommande.js";
import Bar from "../models/bar.js";
import Table from "../models/table.js";
import BarBiere from "../models/barBiere.js";
import { Op } from "sequelize";

export async function getGlobalIncome() {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  startOfYear.setHours(0, 0, 0, 0);

  const orders = await Commande.findAll({
    where: {
      status: "fini",
    },
  });

  console.log("ALL ORDERS:", orders.map(o => ({
    id: o.id,
    price: o.price,
    date: o.date
  })));

  const total = orders.reduce((sum, o) => 
    sum + (Number(o.price) || 0),
    0
  );

  return { total };
}

export async function getIncomeByBar() {
  const bars = await Bar.findAll({
    include: {
      model: Table,
      include: {
        model: Commande,
        attributes: ["price", "status"]
      }
    }
  });

  return bars.map(bar => {
    const orders =
      bar.Tables?.flatMap(t => t.Commandes || []) || [];

    const total = orders
      .filter(o => o.status === "fini")
      .reduce((sum, o) => sum + (Number(o.price) || 0), 0);

    return {
      barId: bar.id,
      name: bar.name,
      total
    };
  });
}

export async function getTopBeers(limit = 5) {
  const beers = await Biere.findAll({
    include: [
      {
        model: BiereCommande,
        attributes: ["quantity"]
      }
    ]
  });

  const result = beers.map(b => {
    const quantity_sold =
      b.BiereCommandes?.reduce(
        (sum, bc) => sum + (bc.quantity || 0),
        0
      ) || 0;

    return {
      biereId: b.id,
      name: b.name,
      quantity_sold
    };
  });

  return result
    .sort((a, b) => b.quantity_sold - a.quantity_sold)
    .slice(0, limit);
}

export async function getSalesByPeriod(start, end) {
  if (!start || !end) {
    throw new Error("Missing start or end date");
  }

  const orders = await Commande.findAll({
    where: {
      status: "fini",
      date: {
        [Op.between]: [new Date(start), new Date(end)]
      }
    },
    attributes: ["price", "date"]
  });

  const total = orders.reduce(
    (sum, o) => sum + (Number(o.price) || 0),
    0
  );

  return {
    start,
    end,
    total,
    count: orders.length,
    orders: orders.map(o => ({
      date: o.date,
      price: o.price
    }))
  };
}

export async function getStockUsage() {
  const stock = await BarBiere.findAll({
    include: [
      {
        model: Biere,
        attributes: ["name"],
        required: false
      },
      {
        model: Bar,
        attributes: ["name"],
        required: false
      }
    ]
  });

  return stock.map(s => ({
    barId: s.barId,
    biereId: s.biereId,
    beer_name: s.Biere?.name ?? "Unknown",
    bar_name: s.Bar?.name ?? "Unknown",
    stock: s.stock ?? 0
  }));
}