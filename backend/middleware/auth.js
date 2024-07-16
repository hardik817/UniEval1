const { getuser } = require("../service/auth");
async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const user = getuser(userUid);
    if (!user) {
        return res.status(401).json({ isAuthenticated: false });
    }
    console.log(user)
    req.user = user;
    next();
}
function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.uid
    req.user = null
    if (!tokenCookie) return next();
    const token = tokenCookie
    const user = getuser(token)
    req.user = user
    next()
}
async function restrictToLoggedInUserOnlyForAdmin(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const user = getuser(userUid);
    console.log(user)
    if (!user || user.role == "student" || user.role == "teacher") {
        return res.status(401).json({ isAuthenticated: false });
    }
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly, checkForAuthentication, restrictToLoggedInUserOnlyForAdmin,
};