import express from "express";
import * as controller from "../controllers/tableController.js";
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

//CRUD Tables
router.get("/", authenticate, can("VIEW_TABLE"), controller.getAll);
router.get("/:id", authenticate, can("VIEW_TABLE"), controller.getOne);
router.post("/", authenticate, can("CREATE_TABLE"), controller.create);
router.put("/:id", authenticate, can("UPDATE_TABLE"), controller.update);
router.delete("/:id", authenticate, can("DELETE_TABLE"), controller.deactivate);
router.patch("/:id", authenticate, can("UPDATE_TABLE"), controller.restore);

export default router;