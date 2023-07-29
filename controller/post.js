const postHelperFunction = require("../helperFunction/post")

async function createPost(req, res, next) {
  try {
    await postHelperFunction.createPost(req.body)

    res.status(201).json("Post created")
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createPost
}
