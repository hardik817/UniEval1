const { getTeach } = require("../service/teach");
async function restrictToLoggedInTeacherrOnly(req, res, next) {
    const userUid = req.cookies?.teachid;
    if (!userUid) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const user = getTeach(userUid);
    if (!user) {
        return res.status(401).json({ isAuthenticated: false });
    }
    console.log(user)
    req.user = user;
    next();
}
module.exports = {
    restrictToLoggedInTeacherrOnly,
};