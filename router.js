const express = require("express")
const router = express.Router()

const userController = require("./controller/user")

//authentication
router.post("/register-email", userController.registerEmail)
//router.post("/register-cardano", userController.registerCardano)
router.post("/login-email", userController.loginEmail)
//router.post("/login-cardano", userController.loginCardano)

router.use("*", (req, res) => {
  res.status(404).json("Url not found.")
})

module.exports = router
