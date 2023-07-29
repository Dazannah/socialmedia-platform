const CreatePost = require("../module/CreatePost")
const FindPost = require("../module/FindPost")

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
  const postId = data.params.id

  const findPost = new FindPost(postId)
  findPost.validatePostId()
  await findPost.findPost()
  await findPost.findAuthorUsername()
  const post = findPost.getDataToSend()

  return post
}

module.exports = {
  createPost,
  findPost
}
