import jwt from "jsonwebtoken";

const authMiddle = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send({ success: false, message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send({ success: false, message: "Forbidden" });
  }
};
export default authMiddle;
