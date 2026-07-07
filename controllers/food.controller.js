import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import FoodModel from "../models/food.model.js";

export const createFood = async (req, res) => {
  try {
    const { name, description, actualPrice, discountPrice } = req.body;

    if (!name || !description || !actualPrice || !discountPrice) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Food image is required",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-app",
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.log("Temp file cleanup failed:", err.message);
    });

    const food = await FoodModel.create({
      name,
      description,
      image: uploadedImage.secure_url,
      actualPrice,
      discountPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findById(id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Food details found successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // extract public_id from the cloudinary URL to delete the actual image
    const publicId = food.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`food-app/${publicId}`).catch((err) => {
      console.log("Cloudinary delete failed:", err.message);
    });

    await FoodModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    let image = food.image;

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "food-app",
      });
      image = uploadedImage.secure_url;

      fs.unlink(req.file.path, (err) => {
        if (err) console.log("Temp file cleanup failed:", err.message);
      });

      // clean up old image
      const oldPublicId = food.image.split("/").pop().split(".")[0];
      cloudinary.uploader.destroy(`food-app/${oldPublicId}`).catch(() => {});
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      { ...req.body, image },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};