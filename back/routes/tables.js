import express from "express";
import * as controller from "../controllers/tableController";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

//CRUD Tables
router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.post("/", authenticate, authorization("ADMIN", "GERANT"), controller.create);
router.put("/:id", authenticate, authorization("ADMIN", "GERANT"), controller.update);
router.delete("/:id", authenticate, authorization("ADMIN", "GERANT"), controller.deactivate);
router.patch("/:id", authenticate, authorization("ADMIN", "GERANT"), controller.restore);

export default router;