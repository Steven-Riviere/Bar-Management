import User from "../../models/user.js";
import bcrypt from "bcrypt";

const adminData = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: "adminPassword123",
    role: "ADMIN",
    active: true,
  },
  {
    name: "Gérant",
    email: "gerant@example.com",
    password: "gerantPassword123",
    role: "GERANT",
    active: true,
  },
  {
    name: "BARMAN",
    email: "barman@example.com",
    password: "barmanPassword123",
    role: "BARMAN",
    active: true,
  },
  {
    name: "SERVEUR",
    email: "serveur@example.com",
    password: "serveurPassword123",
    role: "SERVEUR",
    active: true,
  },
  {
    name: "RH",
    email: "rh@example.com",
    password: "rhPassword123",
    role: "RH",
    active: true,
  },

];


const seedUser = async () => {
  try {
    for (const user of adminData) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword
      });
    }
    console.info("Admin user seeded!");
  } catch (err) {
    console.error("Failed to seed admin user:", err);
  }
};

export default seedUser;
