import seedBar from "./seedBar.js";
import seedBiere from "./seedBiere.js";
import seedBarBiere from "./seedBarBiere.js";
import seedPaiement from "./seedPaiement.js";
import seedUser from "./seedUser.js";

export async function seedDatabase() {
  await seedBar();
  await seedBiere();
  await seedBarBiere();
  await seedPaiement();
  await seedUser();
}
