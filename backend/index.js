import express from "express";
import userRouter from "./routes/user.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";
import boardRouter from "./routes/board.route.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectdb.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/boards", boardRouter);
app.use("/comments", commentRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running oh yeah");
});
