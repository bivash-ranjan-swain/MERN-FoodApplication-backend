import express from "express";
import {
  getUserInformation,
  LoginUser,
  LogoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", LoginUser);
UserRouter.post("/logout", LogoutUser); // changed from GET — logout changes state
UserRouter.get("/get-user", isAuthenticated, getUserInformation);

export default UserRouter;