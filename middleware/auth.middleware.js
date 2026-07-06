import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

// export const isAuthenticated = async (req, res, next) => {
//   try {
//     console.log("Cookies =>", req.cookies);

//     const token = req.cookies.userToken;

//     console.log("Token =>", token);

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Please Login First",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRETE, (err, decode)=>{
//       if(err){
//         return res.status(401).send({
//           success: false,
//           message: "Un-Authorized User"
//         })
//       }
//       else{
//         req.body.id = decode.id
//         next();
//       }
//     });

//     console.log("Decoded =>", decoded);

//     const user = await UserModel.findById(decoded.UserId);

//     console.log("User =>", user);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User Not Found",
//       });
//     }

//     req.user = user;

//     next();
//   } 
  
//   catch (error) {
//     console.log(error);

//     return res.status(401).json({
//       success: false,
//       message: "Error in auth api",
//       error
//     });
//   }
// };

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.userToken; 

    if (!token) {
      return res.status(401).json({ message: "No token provided, unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    console.log("Decoded =>", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token, unauthorized" });
    }

    req.user = { id: decoded.UserId };
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
