const postHelperFunction = require("../helperFunction/post")

async function createPost(req, res, next) {
  try {
    const createdPostId = await postHelperFunction.createPost(req.body)

    res.status(201).json({ message: "Post created", postId: createdPostId })
  } catch (err) {
    next(err)
  }
}

async function findPostById(req, res, next) {
  try {
    const post = await postHelperFunction.findPostById(req)

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

async function deletePost(req, res, next) {
  try {
    await postHelperFunction.deletePost(req)

    res.status(200).json("Post was successfully deleted.")
  } catch (err) {
    next(err)
  }
}

async function searchPostByContent(req, res, next) {
  try {
    const foundPosts = await postHelperFunction.searchPostByContent(req)

    res.status(200).json(foundPosts)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createPost,
  findPostById,
  editPost,
  deletePost,
  searchPostByContent
}
