async function createPost(data) {
  const username = data.username
  const title = data.postTitle
  const postBody = data.postBody
  const createDate = new Date()
  console.log(username, title, postBody, createDate)
}

module.exports = {
  createPost
}
