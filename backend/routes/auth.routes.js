import express from "express";
import {
  getAuthUser,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getAuthUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/signup", signUpUser);

export default router;
