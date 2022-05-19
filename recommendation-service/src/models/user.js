const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    profilePicture: { type: String },
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
