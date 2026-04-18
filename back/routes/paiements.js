import express from "express";
import * as controller from '../controllers/paiementController.js';
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

//CRUD paiements
router.get('/', authenticate, can("VIEW_PAYMENT"), controller.getAll);
router.get("/:id", authenticate, can("VIEW_PAYMENT"), controller.getOne);
router.post('/', authenticate, can("CREATE_PAYMENT"), controller.create);
router.put("/:id", authenticate, can("UPDATE_PAYMENT"), controller.update);
router.delete("/:id", authenticate, can("DELETE_PAYMENT"), controller.deactivate);
router.patch("/:id", authenticate, can("UPDATE_PAYMENT"), controller.enable);

export default router;