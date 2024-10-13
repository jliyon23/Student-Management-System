import Admin from "../../models/usermodels/admin.model.js";
import createTokenAndSaveCookie from "../../jwt/generate.token.js";
import { verifyUser } from "../../jwt/verify.user.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid login credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid login credentials" });
    }

    await createTokenAndSaveCookie(admin._id, res);
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({
        status: "success",
        message: "Registration successful",
        data: { name: newAdmin.name, email: newAdmin.email },
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const verify = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Token not found. Please log in.",
    });
  }

  try {
    const user = await verifyUser(token);
    return res.status(200).json({
      status: "success",
      message: "User verified successfully",
      data: { user },
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export const logout = (req, res) => {
    try {
      res.clearCookie("jwt");
      return res.status(200).json({
        status: "success",
        message: "User logged out successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error.",
        error: error.message,
      });
    }
  };
