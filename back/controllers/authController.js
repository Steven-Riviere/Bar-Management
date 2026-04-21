import * as service from "../services/authService.js";

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const result = await service.login(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // true en prod
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000 // 1h
    });

    res.json({
      message: "Connexion réussie",
      user: result.user
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "Mot de passe trop faible (8 caractères, 1 majuscule, 1 chiffre)."
      });
    }

    const user = await service.signup({ name, email, password, role });

    res.status(201).json({
      message: "Compte créé avec succès",
      user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
