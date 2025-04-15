import express from "express";

import {
  followUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);

router.get("/:username", getUser);

router.post("/follow/:userName", verifyToken, followUser);

export default router;
