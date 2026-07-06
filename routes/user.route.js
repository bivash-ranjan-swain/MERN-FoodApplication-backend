import express from "express";
import {
  getUserInformation,
  LoginUser,
  LogoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const UserRouter = express.Router();

// register method - post
UserRouter.get('/get-user', isAuthenticated, getUserInformation);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", LoginUser);
UserRouter.get("/logout", LogoutUser);

export default UserRouter;
