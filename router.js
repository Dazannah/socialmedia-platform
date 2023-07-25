const express = require("express")
const router = express.Router()

const loginController = require("./controller/login")

//authentication
router.post("/register-email", loginController.registerEmail)
router.post("/register-cardano", loginController.registerCardano)
router.post("/login-email", loginController.loginEmail)
router.post("/login-cardano", loginController.loginCardano)

module.exports = router
