import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true, // XSS protection
    secure: isProduction, // Only use secure cookies in production
    sameSite: isProduction ? "strict" : "lax", // Allow lax for development
  });
};
export default createTokenAndSaveCookie;
