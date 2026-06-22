import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

 const registerUser = async (req, res) => {
  try {
    const { fullName, PhoneNo, gender, email, password, role } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already Exist",
      });
    }

    if (PhoneNo.length < 10) {
      return res.status(400).json({
        message: "Phone No atleast 10 digit",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password atleast 6 Charectors",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const CraeteUser = await UserModel.create({
      fullName,
      PhoneNo,
      gender,
      email,
      password: hashpassword,
      role, 
    });

    return res.status(201).json({
      message: "User Create Successfully",
      CraeteUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

export default registerUser