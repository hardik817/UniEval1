const jwt = require("jsonwebtoken")
const secret = "hhs"
function setTeach(user) {
    return jwt.sign({
        _id: user._id,
        classnumber: user.classnumber,
        email: user.coursename,
    }, secret)
}
function getTeach(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Invalid or expired token:", error);
        return null;
    }
}
module.exports = {
    setTeach,
    getTeach
}
