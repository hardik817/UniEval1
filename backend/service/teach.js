const jwt = require("jsonwebtoken")
const secret = "hhs"
function setTeach(user) {
    // Log the user object to ensure it has the classnumber property
    console.log("Creating token for user:", user);
    return jwt.sign({
        _id: user._id,
        classnumber: user.classnumber,
        username: user.username // Ensure this is correct property for email
    }, secret);
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
