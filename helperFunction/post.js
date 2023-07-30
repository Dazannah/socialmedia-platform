const { CreatePost, FindPost, EditPost, DeletePost } = require("../module/Post")

async function createPost(data) {
  const username = data.username
  const postTitle = data.postTitle
  const postBody = data.postBody
  const postCreateDate = new Date()

  const createPost = new CreatePost(username, postTitle, postBody, postCreateDate)
  createPost.validatePost()
  await createPost.getUserId()
  const createdPostId = await createPost.savePost()

  return createdPostId
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

async function deletePost(data) {
  const postId = data.params.id
  const username = data.body.username

  const originalPost = await findPost(data)
  const deletePost = new DeletePost(username, postId, originalPost)
  deletePost.checkOwnership()
  await deletePost.deletePost()
}

module.exports = {
  createPost,
  findPost,
  editPost,
  deletePost
}
