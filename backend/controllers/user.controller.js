import { message } from "antd";
import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const userName = req.params.username;
  const user = await User.findOne({ userName: userName });

  const followers = await Follow.countDocuments({ following: user._id });
  const following = await Follow.countDocuments({ follower: user._id });
  const { password, ...detailsWithoutPassword } = user.toObject();

  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({
      ...detailsWithoutPassword,
      followersCount: followers,
      followingCount: following,
      isFollowing: false,
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (!err) {
        const isExists = await Follow.exists({
          follower: decoded.userId,
          following: user._id,
        });

        return res.status(200).json({
          ...detailsWithoutPassword,
          followersCount: followers,
          followingCount: following,
          isFollowing: isExists ? true : false,
        });
      }
    });
  }
};

export const registerUser = async (req, res) => {
  const { displayName, userName, email, password } = req.body;
  if (!displayName || !userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newHashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      displayName,
      userName,
      email,
      password: newHashedPassword,
    });

    const { password: _, ...detailsWithoutPassword } = user.toObject();

    res.status(201).json({ detailsWithoutPassword });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Unable to create user. Please try again." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // token is made with {userId}
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...detailsWithoutPassword } = user.toObject();

    return res.status(200).json(detailsWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Unable to create user. Please try again." });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const followUser = async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findOne({ userName: userName });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userId = user._id;
  const loggedInUserId = req.userId;

  const isFollowing = await Follow.exists({
    follower: loggedInUserId,
    following: userId,
  });

  if (!isFollowing) {
    await Follow.create({
      follower: loggedInUserId,
      following: userId,
    });
    return res.status(200).json({ message: "Followed successfully" });
  } else {
    await Follow.deleteOne({ follower: loggedInUserId, following: userId });
    return res.status(200).json({ message: "Unfollowed successfully" });
  }
};
