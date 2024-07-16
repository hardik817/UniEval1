const Course = require("../models/course")
const Teacher = require("../models/teacher")

async function updateCourse(req, res) {
    const { username, classnumber, coursename } = req.body
    const user = await Course.findOne({ classnumber });
    const existingTeacher = await Teacher.findOne({ username });
    if (!existingTeacher) {
        return res.status(400).send('Teacher not found');
    }
    if (user) {
        return res.status(400).send('classnumber exists')
    }
    await Course.create({ username, classnumber, coursename })
    await Teacher.findOneAndUpdate({ username }, { $push: { coursesTeach: coursename } })
    res.status(200).send("Course created successfully.");
}
module.exports = {
    updateCourse,
}