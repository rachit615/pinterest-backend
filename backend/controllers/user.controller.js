import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  const userName = req.params.username;
  console.log("first", userName);
  const user = await User.findOne({ userName: userName });

  const { password, ...detailsWithoutPassword } = user.toObject();

  console.log("user1", user);
  return res.status(200).json(detailsWithoutPassword);
};
