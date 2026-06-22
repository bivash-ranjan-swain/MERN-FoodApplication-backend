import express from 'express'
import registerUser from '../controllers/User.controller.js'

const userRouter = express.Router()

userRouter.post("/register", registerUser)