import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'FullName is required.']
    },
    phoneNo: {
      type: Number,
      required: [true, 'phone numbr is required.']
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: ["male", "female", "others"],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    role: {
      type: String,
      required: [true, 'role must be given'],
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      type: String,
      default: 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/'
    }
  },
  {
    timestamps: true
  },
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
