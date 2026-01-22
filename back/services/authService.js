import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


export async function login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    if (!user.active) {
        throw new Error("Compte désactivé");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign(
        { 
            id: user.id, 
            role: user.role,
            name: user.name 
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            role: user.role
        }
    };
}

export async function signup(data) {
    const { name, email, password, role } = data;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
        throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "SERVEUR"
    });

    return user;
}
