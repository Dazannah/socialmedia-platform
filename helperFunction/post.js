const { CreatePost, FindPost, EditPost } = require("../module/Post")

async function createPost(data) {
  const username = data.username
  const postTitle = data.postTitle
  const postBody = data.postBody
  const postCreateDate = new Date()

  const createPost = new CreatePost(username, postTitle, postBody, postCreateDate)
  createPost.validatePost()
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

async function editPost(data) {
  const postTitle = data.body.postTitle
  const postBody = data.body.postBody
  const username = data.body.username

  const originalPost = await findPost(data)

  const editPost = new EditPost(username, postTitle, postBody, originalPost)
  editPost.checkOwnership()
  editPost.validatePost()
  await editPost.updatePost()
}

module.exports = {
  createPost,
  findPost,
  editPost
}
