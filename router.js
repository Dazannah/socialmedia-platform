const express = require("express")
const router = express.Router()

const loginController = require("./controller/login")

//authentication
router.post("/login", loginController.login)

module.exports = router
