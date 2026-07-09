import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contact.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const ContactRouter = express.Router();

ContactRouter.post("/create-contact", createContact); 
ContactRouter.get("/all", isAuthenticated, isAdmin, getAllContacts); 
ContactRouter.delete("/delete/:id", isAuthenticated, isAdmin, deleteContact); 

export default ContactRouter;