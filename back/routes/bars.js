import express from "express";
import * as controller from "../controllers/barController.js";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

// CRUD Bars
router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.post("/", authenticate, authorization("ADMIN", "GERANT"), controller.create);
router.put("/:id", authenticate, authorization("ADMIN", "GERANT"), controller.update);
router.delete("/:id", authenticate, authorization("ADMIN", "GERANT"), controller.remove);

// Bières
router.get("/:bar_id/bieres", controller.getBieres);
router.post("/:bar_id/bieres", authenticate, authorization("ADMIN", "GERANT", "BARMAN"), controller.addBiere);
router.delete("/:bar_id/bieres/:biere_id", authenticate, authorization("ADMIN", "GERANT", "BARMAN"), controller.removeBiere);

export default router;