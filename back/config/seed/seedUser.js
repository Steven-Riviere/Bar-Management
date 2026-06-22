import User from "../../models/user.js";
import Bar from "../../models/bar.js";
import bcrypt from "bcrypt";

const firstNames = [
  "Lucas", "Emma", "Hugo", "Lina", "Noah", "Chloé",
  "Nathan", "Inès", "Louis", "Manon", "Adam", "Sarah",
  "Tom", "Léa", "Yanis", "Julie"
];

const lastNames = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert",
  "Richard", "Petit", "Durand", "Moreau", "Simon"
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
  return `${randomFrom(firstNames)} ${randomFrom(lastNames)}`;
}

const seedUser = async () => {
  try {
    await User.destroy({ where: {} });

    const bars = await Bar.findAll({
      where: {
        type: "BAR"
      }
    });
    
    if (!bars.length) throw new Error("Aucun bar trouvé");

    const users = [];

    users.push(
      {
        name: "Steven",
        email: "admin@example.com",
        password: "adminPassword123",
        role: "ADMIN",
        barId: null
      },
      {
        name: "Benjamin",
        email: "gerant@example.com",
        password: "gerantPassword123",
        role: "GERANT",
        barId: null
      },
      {
        name: "Sophie",
        email: "rh@example.com",
        password: "rhPassword123",
        role: "RH",
        barId: null
      },
    );


  // Equipes
      bars.forEach((bar, index) => {

      // 1 barman
      users.push({
        name: generateName(),
        email: `barman${index}@example.com`,
        password: "password123",
        role: "BARMAN",
        barId: bar.id
      });

      // 2 à 3 serveurs
      const nbServeurs = 2 + Math.floor(Math.random() * 2);

      for (let i = 0; i < nbServeurs; i++) {
        users.push({
          name: generateName(),
          email: `serveur${index}_${i}@example.com`,
          password: "password123",
          role: "SERVEUR",
          barId: bar.id
        });
      }
    });

    // hash + insert
    for (const u of users) {
      const hashed = await bcrypt.hash(u.password, 10);

      await User.create({
        ...u,
        password: hashed,
        active: true
      });
    }

    console.info("✅ Users seeded (équipes réalistes par bar)");
  } catch (err) {
    console.error("Seed user failed:", err);
  }
};

export default seedUser;