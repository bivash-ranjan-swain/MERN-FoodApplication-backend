import express from 'express'
import dotenv from 'dotenv/config'
import connectDb from './config/db.js'
import dns from "dns"
import userRouter from './controllers/User.controller.js'

const app = express()

app.use(express.json())
app.use("/api/auth", userRouter)

dns.setServers(["8.8.8.8", "8.8.8.4"])

const PORT = process.env.PORT || 8000
connectDb();


app.get("/",(req, res)=>{
    res.send("Hello From Get Route")
})


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})