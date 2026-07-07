import 'dotenv/config'

import mongoose from "mongoose";
import colors from "colors";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]); 

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Database connected successfully to ${mongoose.connection.host}`.cyan
        .underline,
    );
  } catch (error) {
    console.log("Error connecting to database".red.bold);
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;