import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    actualPrice: {
      type: String,
      require: true,
    },
    discoutPrice: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const FoodModel = mongoose.model("Food", foodSchema);

export default FoodModel;
