import express from "express";
import * as controller from "../controllers/authController.js";

const router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);

export default router;
