import express from "express";
import { signup, login } from "../controller/users.controller.js";


const router = express.Router();
router.use(express.json());
router.post("/signup", signup);
router.post("/login", login);

export default router;