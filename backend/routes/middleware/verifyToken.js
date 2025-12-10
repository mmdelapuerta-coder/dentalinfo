// backend/routes/middleware/verifyToken.js
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Check for token in Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded payload to request
    next(); // continue to the next middleware or route handler
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;
