import 'dotenv/config'

import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw error; // don't swallow this — a failed token means login should fail, not silently continue with `undefined`
  }
};

export default genToken;
