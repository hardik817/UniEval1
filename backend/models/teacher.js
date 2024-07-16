const mongoose = require("mongoose")
const teacherSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true,
        default: "teacher",
    },
    coursesTeach: {
        type: Array,
    }
}, { timestamps: true })
const Teacher = mongoose.model("teacher", teacherSchema)
module.exports = Teacher