import TableModel from "../model/table.model.js";

export const createTable = async (req, res) => {
  try {
    const { date, time, name, phone, totalPerson } = req.body;

    const table = await TableModel.create({
      date,
      time,
      name,
      phone,
      totalPerson,
    });

    return res.status(201).json({
      success: true,
      message: "Table booked successfully.",
      table,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTables = async (req, res) => {
  try {
    const tables = await TableModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      total: tables.length,
      tables,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;

    const table = await TableModel.findById(id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table booking not found.",
      });
    }

    await TableModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Table booking deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};