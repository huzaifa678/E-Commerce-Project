import express from "express";
import { createPurchase } from "../controller/product.controller.js";

const router = express.Router();
router.use(express.json());
router.post("/payments", createPurchase);

export default router;

