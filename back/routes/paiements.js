import express from "express";
import * as controller from '../controllers/paiementController.js';
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

//CRUD paiements
router.get('/', authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.post('/', authenticate, authorize('ADMIN', 'GERANT'), controller.create);
router.put("/:id", authenticate, authorize("ADMIN", "GERANT"), controller.update);
router.delete("/:id",authenticate, authorize("ADMIN", "GERANT"),controller.deactivate);
router.patch("/:id",authenticate, authorize("ADMIN", "GERANT"),controller.enable);

export default router;