import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({where : {email}});

        if(!user) {
            return res.status(400).json({error :" Utilisateur introuvable"});
        }

        if(!user.active){
        return res.status(403).json({error : "Le compte est désactivé, veuillez contacter un administrateur"});
        }

        const pass = await bcrypt.compare(password, user.password);
        if(!pass) {
            return res.status(401).json({error : "Mot de passe incorrect"});
        }

        const token = jwt.sign(
            {
                id : user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        return res.json({
            message: "Connexion réussie",
            token,
            user: {
                id : user.id,
                name: user.name,
                role: user.role,
            }
        });
    } catch(err) {
        return res.status(500).json({error : err.message});
    }
});

export default router;