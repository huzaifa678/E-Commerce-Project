import express from "express";
import { createPurchase } from "../controller/product.controller.js";
import { authenticate } from "../middleware/interceptor.middleware.js";

const router = express.Router();
router.use(express.json());
router.post("/payments", authenticate, createPurchase);

export default router;

