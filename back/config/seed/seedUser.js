import User from "../../models/user.js";
import bcrypt from "bcrypt";

const adminData = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: "adminPassword123",
    role: "ADMIN",
    active: true,
  }
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
    console.info("✅ Admin user seeded!");
  } catch (err) {
    console.error("Failed to seed admin user:", err);
  }
};

export default seedUser;
