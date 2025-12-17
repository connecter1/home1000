import tokenUtils from "../utils/tokenUtils.js";
const { verifyToken } = tokenUtils;

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Missing or invalid token" });

    const token = authHeader.split(" ")[1];
    const data = verifyToken(token);
    req.user = data;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};