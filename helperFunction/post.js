const { CreatePost, FindPostById, EditPost, DeletePost, SearchPostByContent } = require("../module/Post")

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

async function findPostById(data) {
  const postId = data.params.id

  const findPostById = new FindPostById(postId)
  findPostById.validatePostId()
  await findPostById.findPost()
  await findPostById.findAuthorUsername()
  const post = findPostById.getDataToSend()

  return post
}

async function editPost(data) {
  const postTitle = data.body.postTitle
  const postBody = data.body.postBody
  const username = data.body.username

  const originalPost = await findPostById(data)

  const editPost = new EditPost(username, postTitle, postBody, originalPost)
  editPost.checkOwnership()
  editPost.validatePost()
  await editPost.updatePost()
}

async function deletePost(data) {
  const postId = data.params.id
  const username = data.body.username

  const originalPost = await findPostById(data)
  const deletePost = new DeletePost(username, postId, originalPost)
  deletePost.checkOwnership()
  await deletePost.deletePost()
}

async function searchPostByBody(data) {
  const searchField = data.body.searchField

  const searchPostByContent = new SearchPostByContent("postBody", searchField)
  searchPostByContent.createQuerry()
  const foundPosts = await searchPostByContent.findPosts()

  return foundPosts
}

module.exports = {
  createPost,
  findPostById,
  editPost,
  deletePost,
  searchPostByBody
}
