const jwt = require("jsonwebtoken")
const secret = "hhs"
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret)
}
function getuser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Invalid or expired token:", error);
        return null;
    }
}
module.exports = {
    setUser,
    getuser
}