const { throwErrorArray, throwErrorSingle } = require("../utils/errors")
const { DatabaseFind, DatabaseSave, DatabaseUpdate, DatabaseDelete } = require("./Database")
const { ObjectId } = require("mongodb")

class Post {
  constructor(username, postTitle, postBody) {
    this.username = username
    this.postTitle = postTitle
    this.postBody = postBody
    this.error = []
  }

  validatePost() {
    if (this.postTitle === undefined || this.postTitle === null || this.postTitle.trim() === "") this.error.push("The title can't be empty.")
    if (this.postBody === undefined || this.postBody === null || this.postBody.trim() === "") this.error.push("The content can't be empty.")
    throwErrorArray(this.error, 409)

    if (this.postTitle.trim().length < 4) this.error.push("The title must be longer than 3 letter.")

    throwErrorArray(this.error, 409)
  }

  async getUserId() {
    const databaseFind = new DatabaseFind("users", { username: this.username })
    const foundUser = await databaseFind.findOneWithQuerry()
    this.user_id = foundUser._id
  }
}

class CreatePost extends Post {
  constructor(username, postTitle, postBody, postCreateDate) {
    super(username, postTitle, postBody)
    this.postCreateDate = postCreateDate
  }

  async savePost() {
    const databaseSave = new DatabaseSave("userCreatedPosts", { postTitle: this.postTitle, postBody: this.postBody, postCreateDate: this.postCreateDate, author: this.user_id })
    const createdPost = await databaseSave.saveOne()

    return createdPost.insertedId
  }
}

class EditPost extends Post {
  constructor(username, postTitle, postBody, originalPost) {
    super(username, postTitle, postBody)
    this.originalPost = originalPost
  }

  checkOwnership() {
    if (this.username != this.originalPost.author) this.error.push("You don't have authorization to edit this post.")
    throwErrorArray(this.error, 403)
  }

  async updatePost() {
    const databaseUpdate = new DatabaseUpdate("userCreatedPosts", this.originalPost._id, { postTitle: this.postTitle, postBody: this.postBody })
    await databaseUpdate.updateOne()
  }
}

class FindPostById {
  constructor(postId) {
    this.postId = postId
    this.error = []
  }

  validatePostId() {
    if (!ObjectId.isValid(this.postId)) this.error.push("The provided post id is not valid.")

    throwErrorArray(this.error, 409)
  }

  async findPost() {
    const databaseFind = new DatabaseFind("userCreatedPosts", { _id: this.postId })
    this.post = await databaseFind.findOneById()

    if (!this.post) this.error.push("Didn't find post with this id.")
    throwErrorArray(this.error, 409)
  }

  async findAuthorUsername() {
    const databaseFind = new DatabaseFind("users", { _id: this.post.author })
    this.author = await databaseFind.findOneById()
  }

  getDataToSend() {
    this.post._id = this.post._id.toString()
    this.post.author = this.author.username

    return this.post
  }
}

class DeletePost {
  constructor(username, postId, originalPost) {
    this.username = username
    this.postId = postId
    this.originalPost = originalPost
    this.error = []
  }

  checkOwnership() {
    if (this.username != this.originalPost.author) this.error.push("You don't have authorization to delete this post.")

    throwErrorArray(this.error, 403)
  }

  async deletePost() {
    const databaseDelete = new DatabaseDelete("userCreatedPosts", this.postId)
    await databaseDelete.deleteOne()
  }
}

class SearchPostByContent {
  constructor(searchInThis, searchField) {
    this.searchInThis = searchInThis
    this.searchField = searchField
  }

  createQuerry() {
    const regex = new RegExp(this.searchField)
    this.querry = { [this.searchInThis]: { $regex: regex } }
  }

  async findPosts() {
    const databaseFind = new DatabaseFind("userCreatedPosts", this.querry)
    return await databaseFind.findWithQuerry()
  }
}

module.exports = {
  Post,
  CreatePost,
  FindPostById,
  EditPost,
  DeletePost,
  SearchPostByContent
}
