import dotenv from "dotenv";
dotenv.config()

import colors from "colors";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDb from "./config/db.js";
import UserRouter from "./routes/user.route.js";
import FoodRouter from "./routes/food.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Server main page.");
});

app.use("/api/auth", UserRouter);
app.use("/api/food", FoodRouter);


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

const PORT = process.env.PORT || 5500;

connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});