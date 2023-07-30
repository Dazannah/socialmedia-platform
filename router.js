const express = require("express")
const router = express.Router()

const registrationController = require("./controller/registration")
const postController = require("./controller/post")
const loginController = require("./controller/login")

//authentication
router.post("/register-email", registrationController.registerEmail)
//router.post("/register-cardano", userController.registerCardano)
router.post("/login-email", registrationController.loginEmail)
//router.post("/login-cardano", userController.loginCardano)

//protected routes
router.use(loginController.validateLogin)

//profile
//router.get("/profile/:username")
//router.get("/profile/:username/followers")
//router.get("/profile/:username/following")

//posts
router.post("/create-post", postController.createPost)
router.get("/post/:id", postController.findPost)
router.patch("/post/:id/edit", postController.editPost)
router.delete("/post/:id/delete", postController.deletePost)
//router.post("/search")

//follow
//router.post("/addFollow/:username")
//router.post("/removeFollow/:username")

router.use("*", (req, res) => {
  res.status(404).json("Page not found.")
})

module.exports = router
