import * as service from "../services/authService.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await service.login(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // true en prod
      sameSite: "lax",
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
    const user = await service.signup(req.body);

    res.status(201).json({
      message: "Compte créé avec succès",
      user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
