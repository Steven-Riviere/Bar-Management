import express from "express";
import * as controller from "../controllers/barController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

// CRUD Bars
router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.post("/", authenticate, authorize("ADMIN", "GERANT"), controller.create);
router.put("/:id", authenticate, authorize("ADMIN", "GERANT"), controller.update);
router.patch("/:id", authenticate, authorize("ADMIN", "GERANT"), controller.patch);

export default router;