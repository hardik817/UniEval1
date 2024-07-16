const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { restrictToLoggedInUserOnly, checkForAuthentication, restrictToLoggedInUserOnlyForAdmin } = require("./middleware/auth");
const userRoute = require("./routes/user");
const protectedRoute = require("./routes/dashboard");
const adminRoute = require("./routes/admin")
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
const termsConn = mongoose.createConnection("mongodb://localhost:27017")
mongoose.connect("mongodb://127.0.0.1:27017/user1")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("Error in connection:", error);
    });

// Public Routes
app.use("/", userRoute);

// Auth Check Route
app.get("/api/check-auth", restrictToLoggedInUserOnly, (req, res) => {
    res.status(200).json({ isAuthenticated: true });
});
// Protected Routes
app.use("/dashboard", restrictToLoggedInUserOnly, protectedRoute);
//Admin Auth Check Route
app.get("/api/check-auth/admin", restrictToLoggedInUserOnlyForAdmin, (req, res) => {
    res.status(200).json({ isAuthenticated: true });
});
// Admin Route
app.use("/admin", adminRoute);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
