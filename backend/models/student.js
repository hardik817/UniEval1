const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    coursesTeach: {
        type: Array,
    },
    role: {
        type: String,
        required: true,
        default: "student",
    }
}, { timestamps: true })
const User = mongoose.model("user", userSchema)
module.exports = User