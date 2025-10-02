import { verifyAccessToken } from "./auth.middleware.js"; 

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Malformed token" });

    const payload = await verifyAccessToken(token);

    req.user = {
      id: payload.id,
      username: payload.username,
    };

    next(); 
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};