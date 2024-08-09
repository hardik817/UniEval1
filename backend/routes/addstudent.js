const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const { restrictToLoggedInTeacherrOnly } = require("../middleware/courseauth");
const { handleUpload } = require("../controllers/addcourse");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Define the upload directory
const uploadDir = path.join(__dirname, '..', 'uploads'); // Adjust path to ensure it is correctly located

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it does not exist
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post("/", restrictToLoggedInTeacherrOnly, upload.single("studentcsv"), handleUpload);

module.exports = router;
