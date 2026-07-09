import ServiceModel from "../models/services.model.js";

/**
 * CREATE SERVICE
 */
export const createService = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const service = await ServiceModel.create({
      title,
      description,
      category,
      price: req.body.price || 0,
      isFeatured: req.body.isFeatured || false,
      image: req.file.path || req.file.filename,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL SERVICES
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await ServiceModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error("GET ALL SERVICES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SINGLE SERVICE
 */
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await ServiceModel.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("GET SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE SERVICE
 */
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await ServiceModel.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await ServiceModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};