import express from 'express';
import * as controller from '../controller/biereController.js';
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.create);
router.put("/:id", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.update);
router.delete("/:id", authenticate, authorization('ADMIN', 'GERANT', 'BARMAN'), controller.remove);

export default router;