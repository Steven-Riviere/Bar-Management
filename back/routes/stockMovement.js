import express from 'express';
import * as controller from "../controllers/stockMovementController.js";
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

router.get("/", authenticate, can("MANAGE_STOCK"), controller.create);

export default router;