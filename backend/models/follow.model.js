import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const followSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    following: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Follow", followSchema);
