import express from "express";
import * as controller from "../controllers/barController.js";
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

// CRUD Bars
router.get("/", authenticate, can("VIEW_BAR"), controller.getAll);
router.get("/:id", authenticate, can("VIEW_BAR"), controller.getOne);
router.post("/", authenticate, can("CREATE_BAR"), controller.create);
router.put("/:id", authenticate, can("UPDATE_BAR"), controller.update);
router.patch("/:id", authenticate, can("UPDATE_BAR"), controller.patch);

export default router;