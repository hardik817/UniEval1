const express = require("express");
const { updateCourse } = require("../controllers/admin");
const { restrictToLoggedInUserOnlyForAdmin } = require("../middleware/auth");
const router = express.Router();

router.post('/update-course', restrictToLoggedInUserOnlyForAdmin, updateCourse);

module.exports = router;