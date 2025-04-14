import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  console.log("user info");
  const { displayName, userName, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    displayName,
    userName,
    email,
    password: hashedPassword,
  });

  return res.json({ message: "User created", user });
});

export default router;
