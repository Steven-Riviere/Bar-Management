import express from "express";
import * as controller from '../controllers/commandeController.js';
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

// CRUD commandes
router.get("/", authenticate, can("VIEW_ORDER"), controller.getAll);
router.get("/:id", authenticate, can("VIEW_ORDER"), controller.getOne);

router.post("/", authenticate, can("CREATE_ORDER"), controller.create);
router.put("/:id", authenticate, can("UPDATE_ORDER"), controller.update);
router.delete("/:id", authenticate, can("DELETE_ORDER"), controller.remove);


// Paiements
router.post("/:id/paiements", authenticate, can("CREATE_PAYMENT"), controller.addPayment);
router.patch("/:commande_id/paiements/:paiement_id", authenticate, can("UPDATE_PAYMENT"), controller.updatePayment);
router.delete("/:commande_id/paiements/:paiement_id", authenticate, can("DELETE_PAYMENT"), controller.deletePayment);

//Bieres
router.post('/:id/bieres', authenticate, can("UPDATE_ORDER"), controller.addBeer);
router.patch('/:commande_id/bieres/:biere_id', authenticate, can("UPDATE_ORDER"), controller.updateBeer);
router.delete('/:commande_id/bieres/:biere_id', authenticate, can("UPDATE_ORDER"), controller.deleteBeer);

// Clôture
router.patch("/:id/cloturer", authenticate, can("UPDATE_ORDER"), controller.closeOrder);

export default router;