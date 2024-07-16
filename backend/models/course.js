const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    classnumber: {
        type: String,
        required: true
    },
    coursename: {
        type: String,
    },
}, { timestamps: true })
const Course = mongoose.model("course", courseSchema)
module.exports = Course