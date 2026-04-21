import Bar from '../../models/bar.js';
import Biere from '../../models/biere.js';
import BarBiere from '../../models/barBiere.js';

const seedBarBiere = async () => {
  try {
    await BarBiere.destroy({ where: {} });

    const bars = await Bar.findAll();
    const bieres = await Biere.findAll();

    if (!bars.length || !bieres.length) {
      throw new Error("Bars ou bières manquants");
    }

    const data = [];

    for (const bar of bars) {
      for (const biere of bieres) {
        data.push({
          barId: bar.id,
          biereId: biere.id,
          price: Math.floor(Math.random() * 4) + 4,
          stock: bar.type === "WAREHOUSE"
            ? 500
            : Math.floor(Math.random() * 100),
          active: true,
          last_restock_at: new Date()
        });
      }
    }

    await BarBiere.bulkCreate(data, { validate: true });

    console.log("BarBiere seeded");
  } catch (err) {
    console.error("BarBiere seed error:", err);
  }
};

export default seedBarBiere;