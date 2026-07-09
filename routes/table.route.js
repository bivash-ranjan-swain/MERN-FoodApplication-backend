import express from "express";
import { createTable, getAllTables, deleteTable,  } from "../controllers/table.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const TableRouter = express.Router();

TableRouter.post("/create-table", isAuthenticated, isAdmin, createTable);
TableRouter.get("/all-tables", getAllTables);
TableRouter.delete("/delete/:id", isAuthenticated, isAdmin, deleteTable);

export default TableRouter;
// http://localhost:8800/api/table/create-table