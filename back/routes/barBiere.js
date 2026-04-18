import express from "express";
import * as controller from "../controllers/barBiereController.js";
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";


const router = express.Router();

router.get("/:bar_id/bieres", authenticate, can("VIEW_BAR", "VIEW_BEER"), controller.list);
router.post("/:bar_id/bieres/:biere_id", authenticate, can("MANAGE_STOCK"), controller.add);
router.put("/:bar_id/bieres/:biere_id", authenticate, can("MANAGE_STOCK"), controller.update);
router.delete("/:bar_id/bieres/:biere_id", authenticate, can("MANAGE_STOCK"), controller.deactivateBeerFromBar);
router.patch("/:bar_id/bieres/:biere_id", authenticate, can("MANAGE_STOCK"), controller.restoreBeerForBar);

export default router;