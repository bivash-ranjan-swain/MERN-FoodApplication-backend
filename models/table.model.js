import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totalPerson: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TableModel = mongoose.model("Table", tableSchema);

export default TableModel;