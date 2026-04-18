import express from 'express';
import * as controller from "../controllers/biereController.js";
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

router.get("/", authenticate, can("VIEW_BEER"), controller.getAll);
router.get("/:id", authenticate, can("VIEW_BEER"), controller.getOne);
router.post("/", authenticate, can("CREATE_BEER"), controller.create);
router.put("/:id", authenticate, can("UPDATE_BEER"), controller.update);
router.patch("/:id", authenticate, can("UPDATE_BEER"), controller.patch);

export default router;