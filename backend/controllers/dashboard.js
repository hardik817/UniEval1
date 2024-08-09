const Course = require("../models/course")
const Teacher = require("../models/teacher")
const { getuser } = require("../service/auth");
const { setTeach } = require("../service/teach")
async function displayClassNo(req, res) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const user = getuser(userUid);
    if (!user) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const email = user.email
    const teacher = await Teacher.findOne({ email: email })
    const classarray = teacher.coursesTeach
    const courseValuePair = [];
    for (let index = 0; index < classarray.length; index++) {
        const element = classarray[index];
        const course = await Course.findOne({ classnumber: element });
        const coursename = course.coursename
        const classNoCourseArray = [element, coursename]
        courseValuePair.push(classNoCourseArray)
    }
    console.log(courseValuePair);
    res.json(courseValuePair)
}
async function viewCourse(req, res) {
    const { classno, courseView } = req.body;
    console.log(req.body)
    const user = await Course.findOne({ classnumber: classno, coursename: courseView });
    console.log(user)
    if (user) {
        console.log("hello")
        const token = setTeach(user);
        res.cookie("teachid", token, { httpOnly: true });
        console.log(res.cookie)
        console.log("Course Access Granted");
        return res.status(200).send("Course Access Granted");
    }
}
module.exports = { displayClassNo, viewCourse }