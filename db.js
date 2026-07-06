import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const result = await mongoose.connect(process.env.MONODB_URL);
    console.log(`Database connected successfully to ${mongoose.connection.host}`);
  } catch (error) {
    console.log("Occuring error in data base connection!!!", colors.red);
    
    console.error(error);
  }
};

export default connectDb;
