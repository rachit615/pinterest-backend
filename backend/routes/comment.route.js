import express from "express";
import { getPinComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:pinId", getPinComments);

export default router;
