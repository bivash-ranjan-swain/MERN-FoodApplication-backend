import express from "express";
import { createTable, getAllTables } from "../controllers/table.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const TableRouter = express.Router();

TableRouter.post("/create", isAuthenticated, isAdmin, createTable);
FoodRouter.get("/all", getAllTables);
FoodRouter.delete("/delete/:id", isAuthenticated, isAdmin, deleteTable);

export default FoodRouter;