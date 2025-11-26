import seedBar from "./bar.js";
import seedBiere from "./biere.js";
import seedBarBiere from "./barBiere.js";

export async function seedDatabase() {
    await seedBar();
    await seedBiere();
    await seedBarBiere();
}
