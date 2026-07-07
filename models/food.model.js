import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    actualPrice: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, required: true, min: 0 }, // fixed typo from discoutPrice
  },
  { timestamps: true },
);

const FoodModel = mongoose.model("Food", foodSchema);
export default FoodModel;
