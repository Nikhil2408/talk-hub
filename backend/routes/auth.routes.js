import express from "express";
import { loginUser, logoutUser, signUpUser } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/login", loginUser)

router.post("/logout", logoutUser);

router.post("/signup", signUpUser)


export default router;