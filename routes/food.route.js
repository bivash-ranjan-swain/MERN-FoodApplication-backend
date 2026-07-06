import {
  createFood,
  deleteFood,
  getAllFoods,
  getSingleProduct,
  updateFood,
} from "../controllers/food.controller.js";
import express from "express";
import upload from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const FoodRouter = express.Router();

FoodRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createFood,
);
FoodRouter.get("/all", getAllFoods);
FoodRouter.get("/get-single/:id", getSingleProduct);
FoodRouter.delete("/delete/:id", isAuthenticated, isAdmin, deleteFood);
FoodRouter.put(
  "/update/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateFood,
);

export default FoodRouter;
