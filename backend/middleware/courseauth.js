const { getTeach } = require("../service/teach");
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