const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
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

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.password)
    },
}
module.exports = mongoose.model("User", userSchema)
