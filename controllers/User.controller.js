import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, phoneNo, gender, email, password, role } = req.body || {};

    if (!fullName || !phoneNo || !gender || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    if (phoneNo.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be at least 10 digits",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      fullName,
      phoneNo,
      gender,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user", // don't blindly trust client-sent role in production; consider removing this entirely and setting admin manually in DB
    });

    newUser.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in register API",
      error: error.message,
    });
  }
};

export const getUserInformation = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in get user API",
      error: error.message,
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = genToken(user._id);

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure cookies only over HTTPS in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in login API",
      error: error.message,
    });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout error",
      error: error.message,
    });
  }
};

// {
//   "fullName": "Admin",
//   "phoneNo": "1234567890",
//   "gender": "male",
//   "email": "admin@gmail.com",
//   "password": "admin123",
//   "role": "admin"
// }