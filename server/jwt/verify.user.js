import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Admin from "../models/usermodels/admin.model.js";
import Faculty from "../models/usermodels/faculty.model.js";
import Student from "../models/usermodels/student.model.js";

export const verifyUser = async (token) => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is Admin
    const admin = await Admin.findById(decoded.userId).select("-password");
    if (admin) return admin;

    // Check if user is Faculty
    const faculty = await Faculty.findById(decoded.userId).select("-password");
    if (faculty) return faculty;

    // Check if user is Student
    const student = await Student.findById(decoded.userId).select("-password");
    if (student) return student;

    // If no user found
    throw new Error("Unauthorized: User not found");

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Unauthorized: Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Unauthorized: Invalid token");
    } else {
      throw new Error("Unauthorized: " + error.message);
    }
  }
};
