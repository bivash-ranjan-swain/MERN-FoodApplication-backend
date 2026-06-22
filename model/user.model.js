import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },

        PhoneNo: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "others"]
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "user"]
        }
    },
    {
        timestamps: true
    })

const userModel = mongoose.model("User", userSchema)
export default userModel