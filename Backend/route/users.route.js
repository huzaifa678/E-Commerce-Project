import express from "express";
import { signup, login, renewAccessToken } from "../controller/users.controller.js";


const router = express.Router();
router.use(express.json());
router.post("/signup", signup);
router.post("/login", login);
router.post("/renew", renewAccessToken)
export default router;