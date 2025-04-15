import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // get token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    // get userId from token as token is made with {userId}
    req.userId = decoded.userId;
    next();
  });
};
