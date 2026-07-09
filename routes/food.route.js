import express from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  getSingleProduct,
  updateFood,
} from "../controllers/food.controller.js";
import upload from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const FoodRouter = express.Router();

FoodRouter.post("/create-food", isAuthenticated, isAdmin, upload.single("image"), createFood);
FoodRouter.get("/all-foods", getAllFoods);
FoodRouter.get("/get-single/:id", getSingleProduct);
FoodRouter.delete("/delete/:id", isAuthenticated, isAdmin, deleteFood);
FoodRouter.put("/update/:id", isAuthenticated, isAdmin, upload.single("image"), updateFood);

export default FoodRouter;