import express from "express";
import * as controller from '../controllers/commandeController.js';
import authenticate from "../middlewares/auth";
import authorization from "../middlewares/authorize";

const router = express.Router();

// CRUD commandes
router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.post("/", authenticate, controller.create);
router.put("/:id", authenticate, controller.update);
router.delete("/:id",authenticate, authorization("ADMIN", "GERANT", "BARMAN"),controller.remove);

// Paiements
router.post("/:id/paiements", authenticate, controller.addPayment);
router.patch("/:commande_id/paiements/:paiement_id", authenticate, authorization("ADMIN", "GERANT", "BARMAN", "SERVEUR"),controller.updatePayment);
router.delete("/:commande_id/paiements/:paiement_id", authenticate, authorization("ADMIN", "GERANT", "BARMAN", "SERVEUR"),controller.deletePayment);

//Bieres
router.post('/:id/bieres', authenticate, controller.addBeer);
router.patch('/:commande_id/bieres/:biere_id', authenticate, controller.updateBeer);
router.delete('/:commande_id/bieres/:biere_id', authenticate, controller.deleteBeer);

// Clôture
router.patch("/:id/cloturer", authenticate, controller.closeOrder);

export default router;