import express from "express";
import * as controller from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

// CRUD Users
router.get("/", authenticate, can("VIEW_USER"), controller.getAll);
router.get("/:id", authenticate, can("VIEW_USER"), controller.getOne);
router.put("/:id", authenticate, can("UPDATE_USER"), controller.update);
router.patch("/:id", authenticate, can("UPDATE_USER"), controller.patch);

export default router;