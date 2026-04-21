import Commande from "../models/commande.js";
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

  const total = orders.reduce((sum, o) => {
    return sum + (Number(o.price) || 0);
  }, 0);

  return { total };
}