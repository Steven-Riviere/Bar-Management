import express from "express";
import * as controller from "../controllers/analyticsController.js";
import { authenticate } from "../middlewares/auth.js";
import { can } from "../middlewares/permission.js";

const router = express.Router();

router.get("/income/global", authenticate, can("VIEW_ANALYTICS"), controller.globalIncome);
router.get("/income/by-bar", authenticate, can("VIEW_ANALYTICS"), controller.incomeByBar);
router.get("/beers/top", authenticate, can("VIEW_ANALYTICS"), controller.topBeers);
router.get("/sales/period", authenticate, can("VIEW_ANALYTICS"), controller.salesByPeriod);
router.get("/stock/usage", authenticate, can("VIEW_ANALYTICS"), controller.stockUsage);