import express from "express";

const Servicerouter = express.Router();

import {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
} from "../controllers/services.controller.js";

import upload from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

Servicerouter.post(
  "/create-service",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createService
);

Servicerouter.get("/get-all-services", getAllServices);

Servicerouter.get("/get-service/:id", getServiceById);

Servicerouter.delete(
  "/delete-service/:id",
  isAuthenticated,
  isAdmin,
  deleteService
);

export default Servicerouter;