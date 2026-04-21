import express from "express";
import * as controller from "../controllers/authController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.get("/me", authenticate, controller.me);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Déconnexion réussie" });
});

export default router;
