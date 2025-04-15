import Comment from "../models/comment.model.js";

export const getPinComments = async (req, res) => {
  const pinId = req.params.pinId;
  const comments = await Comment.find({ pin: pinId })
    .populate("user", "displayName img userName")
    .sort({ createdAt: -1 });

  return res.status(200).json(comments);
};

export const addPinComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { pin, description } = req.body;

    if (!pin || !description) {
      return res
        .status(400)
        .json({ message: "Pin Id and description are required." });
    }

    const comment = await Comment.create({
      user: userId,
      pin,
      description,
    });

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error adding pin comment:", error);

    res
      .status(500)
      .json({ message: "Failed to add comment. Please try again." });
  }
};
