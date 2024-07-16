const express = require('express');
const router = express.Router();
const { restrictToLoggedInUserOnly } = require('../middleware/auth');

router.get('/dashboard', restrictToLoggedInUserOnly, (req, res) => {
    res.status(200);
});

module.exports = router;
