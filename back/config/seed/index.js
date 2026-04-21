import seedBar from "./seedBar.js";
import seedBiere from "./seedBiere.js";
import seedBarBiere from "./seedBarBiere.js";
import seedPaiement from "./seedPaiement.js";
import seedUser from "./seedUser.js";
import seedPermission from "./seedPermission.js";
import seedUserPermissions from "./seedUserPermissions.js";
import seedTable from "./seedTable.js";
import seedCommande from "./seedCommande.js";

export async function seedDatabase() {
  await seedUser();
  await seedPermission();
  await seedUserPermissions();

  await seedBar();
  await seedBiere();
  await seedBarBiere();
  await seedTable();

  await seedCommande(); 
  await seedPaiement();
}
