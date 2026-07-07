// ======================================
// Create Contact
// ======================================

import ContactModel from "../model/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await ContactModel.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Contacts
// ======================================

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      total: contacts.length,
      contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Contact
// ======================================

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await ContactModel.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    await ContactModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};