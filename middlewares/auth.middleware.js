import 'dotenv/config'

import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "LOGIN FIRST !!!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user; // full user document, so req.user.role works for isAdmin
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};
