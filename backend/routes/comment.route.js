import express from "express";
import {
  addPinComment,
  getPinComments,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:pinId", getPinComments);
router.post("/create", verifyToken, addPinComment);

export default router;
