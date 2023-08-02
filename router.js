const express = require("express")
const router = express.Router()
const cors = require("cors")

const registrationController = require("./controller/registration")
const postController = require("./controller/post")
const loginController = require("./controller/login")
const followController = require("./controller/follow")
const profileController = require("./controller/profile")

router.use(cors())

//authentication
router.post("/register-email", registrationController.registerEmail)
//router.post("/register-cardano", userController.registerCardano)
router.post("/login-email", loginController.loginEmail)
//router.post("/login-cardano", userController.loginCardano)

//protected routes
router.use(loginController.validateLogin)

//profile
//router.get("/profile/:username")
router.get("/profile/:username/followers", profileController.getFollowers)
router.get("/profile/:username/following", profileController.getFollowing)

//posts
router.post("/create-post", postController.createPost)
router.get("/post/:id", postController.findPostById)
router.patch("/post/:id/edit", postController.editPost)
router.delete("/post/:id/delete", postController.deletePost)
router.post("/search-post-body", postController.searchPostByBody)

//follow
router.post("/start-follow/:username", followController.addFollow)
router.delete("/stop-follow/:username", followController.removeFollow)

router.use("*", (req, res) => {
  res.status(404).json("Page not found.")
})

module.exports = router
