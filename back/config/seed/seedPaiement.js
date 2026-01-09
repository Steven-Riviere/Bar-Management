import Paiement from "../../models/paiement.js";

const paiementsData = ["CB", "Espèces", "TR"];

const seedPaiement = async () => {
  try {
    for (const method of paiementsData) {
      await Paiement.findOrCreate({
        where: { method }
      });
    }
    console.info("✅ Database seeded");
  } catch (error) {
    console.error("❌ Failed to seed database :", error);
  }
};

export default seedPaiement;
