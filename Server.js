import dotenv from "dotenv";
dotenv.config();
dotenv.config({ override: true });
import colors from 'colors'
import cors from "cors";
import express from "express";
import connectDb from "./db.js";
import dns from "dns";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route.js";
import FoodRouter from "./routes/food.route.js";
import morgan from 'morgan'


const app = express();
app.get("/", (req, res)=>{
  res.send("Server main page.")
})
app.use(morgan('dev'))

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/auth", UserRouter);
app.use("/api/food", FoodRouter);

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const PORT = process.env.PORT || 5500;
connectDb();
app.listen(PORT, () => {
  console.log(`Server is Runing On ${PORT}`);
});
