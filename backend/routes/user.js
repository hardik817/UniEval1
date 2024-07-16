const express = require("express")
const router = express.Router()
const { handleUserSignup, handleUserLogin } = require("../controllers/user")
router.post('/signup', handleUserSignup)
router.post('/', handleUserLogin)
module.exports = router