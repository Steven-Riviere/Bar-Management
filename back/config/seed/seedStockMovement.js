import StockMovement from "../../models/stockMovement.js";
import Bar from "../../models/bar.js";
import Biere from "../../models/biere.js";

const seedStockMovement = async () => {
  const bars = await Bar.findAll();
  const bieres = await Biere.findAll();

  for (let i = 0; i < 30; i++) {
    const from = bars[Math.floor(Math.random() * bars.length)];
    const to = bars[Math.floor(Math.random() * bars.length)];
    const biere = bieres[Math.floor(Math.random() * bieres.length)];

    await StockMovement.create({
      type: "TRANSFER",
      quantity: Math.floor(Math.random() * 20) + 1,
      biereId: biere.id,
      fromBarId: from.id,
      toBarId: to.id,
      reason: "TRANSFER",
      source_type: "SEED"
    });
  }
};

export default seedStockMovement;