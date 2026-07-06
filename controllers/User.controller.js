import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../util/Token.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// register user controller
export const registerUser = async (req, res) => {
  try {
    const { fullName, phoneNo, gender, email, password, role } = req.body;

    if(!fullName || !phoneNo || !gender || !email || !password || !role){
      return res.status(500).send({
        success: false,
        message: 'All fields are required.'
      })
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email is already Registered",
      });
    }
    if (phoneNo.length < 10) {
      return res.status(400).json({
        message: "Phone No atleast 10 digit",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password atleast 6 Charectors",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const CraeteUser = await UserModel.create({
      fullName,
      phoneNo,
      gender,
      email,
      password: hashedpassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      CraeteUser,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message: 'error in register api' || error,
    });
  }
};

// get user information || GET
export const getUserInformation = async(req, res) => {
  try {
    const user = await UserModel.findById({_id:req.body.id})
    if(!user){
      return res.status(404).send({
        success: false,
        message: "User not found"
      })
    }
      user.password = undefined
      res.status(200).send({
        message: "User data get successfully",
        user
      })
      
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in get user api"
    })
  }
}


  

//user login controller || post
export const LoginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(500).send({
        success: false,
        message: "Please provide email or password"
      })
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        message: "Invalid Username or Password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).json({
        success: false,
        messge: "Invalid Credentials.",
      });
    }

    // const token = await genToken(user._id);
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE, {
      expiresIn: "7d",

    })

    // res.cookie("userToken", token, {
    //   sucure: false,
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });

    // user.password = undefined;


    return res.status(200).json({
      messge: "User Login Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in login API...',
      error
    })
    
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken");
    return res.status(200).json({
      messge: "User Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "LogOut Error",
    });
  }
};

