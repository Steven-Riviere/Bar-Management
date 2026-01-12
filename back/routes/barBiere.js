import express from "express";
import * as controller from "../controllers/barBiereController.js";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

router.get("/:bar_id/bieres", authenticate, authorization(), controller.list);
router.post("/:bar_id/bieres/:biere_id", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.add);
router.put("/:bar_id/bieres/:biere_id", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.update);
router.delete("/:bar_id/bieres/:biere_id", authenticate, authorization('ADMIN', 'GERANT'), controller.deactivateBiereFromBar);
router.patch("/:bar_id/bieres/:biere_id", authenticate, authorization('ADMIN', 'GERANT'), controller.restoreBiereForBar);

export default router;