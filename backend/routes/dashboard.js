const express = require('express');
const router = express.Router();
const { restrictToLoggedInUserOnly } = require("../middleware/auth");
const { displayClassNo, viewCourse } = require("../controllers/dashboard")
router.get('/', restrictToLoggedInUserOnly, displayClassNo);
router.post('/', restrictToLoggedInUserOnly, viewCourse)
module.exports = router;
