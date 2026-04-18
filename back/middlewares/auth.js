import jwt from "jsonwebtoken";
import { User, Permission } from "../models/association.js";

export async function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // on récupere user et les permissions de l'utilisateur
    const user = await User.findByPk(decoded.id, {
      include: {
        model: Permission,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    req.user = 
    { id: user.id, 
      role: user.role,
      permissions: user.Permissions?.map(p => p.name) || []
    };

    next();

  } catch {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
}
