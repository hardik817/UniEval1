const User = require("../models/student")
const Teacher = require("../models/teacher")
const Admin = require("../models/admin")
const { setUser, getuser } = require("../service/auth")
async function handleUserSignup(req, res) {
    const { username, password, email } = req.body
    const user = await User.findOne({ username: username, email: email });
    const user1 = await Teacher.findOne({ username: username, email: email })
    if (!user || !user1) {
        if (username.slice(2) == "b") {
            await User.create({ username, password, email })
        }
        else if (username.slice(2, 5) == "adm") {
            await Admin.create({ username, password, email })
        }
        else {
            await Teacher.create({ username, password, email })
        }
        return res.end("ok")
    }
    return res.status(400).send('Username or Email already exists.')
}
async function handleUserLogin(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username, password: password });
        const user1 = await Teacher.findOne({ username: username, password: password })
        const user2 = await Admin.findOne({ username: username, password: password })
        if (!user && !user1 && !user2) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        if (user) {
            const token = setUser(user);
            res.cookie("uid", token, { httpOnly: true });
            console.log(res.cookie)
            console.log("User found");
            console.log("User authenticated successfully");
            return res.status(200).send("User authenticated successfully");
        }
        if (user1) {
            const token = setUser(user1);
            res.cookie("uid", token, { httpOnly: true });
            console.log(res.cookie)
            console.log("User found");
            console.log("User authenticated successfully");
            return res.status(201).send("User authenticated successfully");
        }
        if (user2) {
            const token = setUser(user2);
            res.cookie("uid", token, { httpOnly: true });
            console.log(res.cookie)
            console.log("User found");
            console.log("User authenticated successfully");
            return res.status(202).send("User authenticated successfully");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    handleUserLogin,
    handleUserSignup,
}