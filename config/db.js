import dotenv from 'dotenv/config'

import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        const result = await mongoose.connect(`${MONGO_URI}`);
        console.log("DATABASE CONNECTED...");
    } catch (error) {
        console.log(error);
    }
};

export default connectDb;