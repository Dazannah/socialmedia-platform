const postHelperFunction = require("../helperFunction/post")

async function createPost(req, res) {
  try {
    await postHelperFunction.createPost(req.body)

    res.status(201).json("Post created")
  } catch (err) {
    console.log(err)
    res.status(err.status).json(err.data)
  }
}

module.exports = {
  createPost
}
