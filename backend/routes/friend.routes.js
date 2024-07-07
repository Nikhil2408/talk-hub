import express from "express";
import { addFriend, acceptFriend } from "../controllers/friend.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/addFriend/:friendId", protectRoute, addFriend);
router.post("/acceptFriend/:friendId", protectRoute, acceptFriend);


export default router;