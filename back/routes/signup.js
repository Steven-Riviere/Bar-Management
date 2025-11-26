import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Vérifier champs
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires." });
        }

        // Vérifier complexité mdp
        if (!validatePassword(password)) {
            return res.status(400).json({
                error: "Mot de passe trop faible (8 caractères, 1 majuscule, 1 chiffre)."
            });
        }

        // Vérifier si email déjà utilisé
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json({ error: "Email déjà utilisé." });
        }

        // Hash du mdp
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création du user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "SERVEUR",
        });

        return res.status(201).json({ message: "Compte créé avec succès", user: newUser });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;