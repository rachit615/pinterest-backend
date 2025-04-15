import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);

router.get("/:username", getUser);

export default router;
