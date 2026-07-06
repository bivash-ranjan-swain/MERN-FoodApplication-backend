import cloudinary from "../config/cloudinary.js";
import FoodModel from "../model/food.model.js";

export const createFood = async (req, res) => {
  try {
    const { name, description, actualPrice, discoutPrice } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Food image is required",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-app",
    });

    const food = await FoodModel.create({
      name,
      description,
      image: uploadedImage.secure_url,
      actualPrice,
      discoutPrice,
    });

    res.status(201).json({
      success: true,
      message: "Food Created Successfully",
      food,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
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
      return res.status(400).json({
        message: "Food Item Not Found",
      });
    }
    return res.status(201).json({
      message: "Food Details Found Successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    await FoodModel.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Food Delete successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
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
        message: "Food Not Found",
      });
    }

    let image = food.image;

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "food-app",
      });

      image = uploadedImage.secure_url;
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Food Updated Successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};
