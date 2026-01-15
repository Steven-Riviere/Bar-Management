import express from "express";
import * as controller from "../controllers/barBiereController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";


const router = express.Router();

router.get("/:bar_id/bieres", authenticate, authorize(), controller.list);
router.post("/:bar_id/bieres/:biere_id", authenticate, authorize('ADMIN', 'GERANT', 'BARMAN'), controller.add);
router.put("/:bar_id/bieres/:biere_id", authenticate, authorize('ADMIN', 'GERANT', 'BARMAN'), controller.update);
router.delete("/:bar_id/bieres/:biere_id", authenticate, authorize('ADMIN', 'GERANT'), controller.deactivateBeerFromBar);
router.patch("/:bar_id/bieres/:biere_id", authenticate, authorize('ADMIN', 'GERANT'), controller.restoreBeerForBar);

export default router;