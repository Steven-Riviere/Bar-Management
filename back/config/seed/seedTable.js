import Table from "../../models/table.js";
import Bar from "../../models/bar.js";

const seedTable = async () => {
  try {
    await Table.destroy({ where: {} });
    const bars = await Bar.findAll();

    if (!bars.length) {
      throw new Error("Aucun bar trouvé. Lance seedBar avant.");
    }

    const tablesData = [];

    bars.forEach((bar) => {
      tablesData.push(
        { number: 1, barId: bar.id },
        { number: 2, barId: bar.id },
        { number: 3, barId: bar.id },
        { number: 4, barId: bar.id },
        { number: 5, barId: bar.id }
      );
    });

    await Table.bulkCreate(tablesData);

    console.info("Tables seeded (5 par bar)");
  } catch (error) {
    console.error("Failed to seed tables:", error);
  }
};

export default seedTable;