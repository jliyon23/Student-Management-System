import createTokenAndSaveCookie from "../../jwt/generate.token.js";
import { verifyUser } from "../../jwt/verify.user.js";
import bcrypt from "bcrypt";
import Faculty from "../../models/usermodels/faculty.model.js";

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const faculty = await Faculty.findOne({ name });
    if(!faculty) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid login credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, faculty.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid login credentials" });
    }

    await createTokenAndSaveCookie(faculty._id, res);
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
