const express = require("express")
const router = express.Router()

const userController = require("./controller/user")
const postController = require("./controller/post")
const loginController = require("./controller/login")

//authentication
router.post("/register-email", userController.registerEmail)
//router.post("/register-cardano", userController.registerCardano)
router.post("/login-email", userController.loginEmail)
//router.post("/login-cardano", userController.loginCardano)

//posts
router.post("/create-post", loginController.validateLogin, postController.createPost)

router.use("*", (req, res) => {
  res.status(404).json("Page not found.")
})

module.exports = router
