const CreatePost = require("../module/CreatePost")

async function createPost(data) {
  const username = data.username
  const postTitle = data.postTitle
  const postBody = data.postBody
  const postCreateDate = new Date()

  const createPost = new CreatePost(username, postTitle, postBody, postCreateDate)
  createPost.validatePostForCreate()
  await createPost.getUserId()
  await createPost.savePost()
}

async function findPost(data) {
  console.log(data)
}

module.exports = {
  createPost,
  findPost
}
