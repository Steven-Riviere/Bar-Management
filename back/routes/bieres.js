import express from 'express';
import * as controller from "../controllers/biereController.js";
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.post("/", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.create);
router.put("/:id", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.update);
router.delete("/:id", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.deactivate);
router.patch("/:id", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.restore)

export default router;