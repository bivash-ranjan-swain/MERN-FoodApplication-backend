import jwt from "jsonwebtoken";
const genToken = (UserId) => {
  try {
    const token = jwt.sign({ UserId }, process.env.JWT_SECRETE, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default genToken;
