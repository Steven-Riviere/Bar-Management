import express from 'express';
import * as controller from "../controllers/biereController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.post("/", authenticate, authorize('ADMIN', 'GERANT', 'BARMAN'), controller.create);
router.put("/:id", authenticate, authorize('ADMIN', 'GERANT', 'BARMAN'), controller.update);
router.patch("/:id", authenticate, authorize('ADMIN', 'GERANT', 'BARMAN'), controller.patch);

export default router;