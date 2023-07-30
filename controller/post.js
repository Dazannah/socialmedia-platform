const postHelperFunction = require("../helperFunction/post")

async function createPost(req, res, next) {
  try {
    await postHelperFunction.createPost(req.body)

    res.status(201).json("Post created")
  } catch (err) {
    next(err)
  }
}

async function findPost(req, res, next) {
  try {
    const post = await postHelperFunction.findPost(req)

    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

async function editPost(req, res, next) {
  try {
    await postHelperFunction.editPost(req)

    res.status(200).json("Post was successfully edited.")
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createPost,
  findPost,
  editPost
}
