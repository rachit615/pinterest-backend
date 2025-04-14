import Comment from "../models/comment.model.js";

export const getPinComments = async (req, res) => {
  const pinId = req.params.pinId;
  const comments = await Comment.find({ pin: pinId })
    .populate("user", "displayName img userName")
    .sort({ createdAt: -1 });

  return res.status(200).json(comments);
};
