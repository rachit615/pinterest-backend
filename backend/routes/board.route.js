import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  return res.json({ message: "test route is working" });
});

export default router;
