const { DatabaseFind } = require("./Database")
const { ObjectId } = require("mongodb")
const { throwErrorArray } = require("../utils/errors")

class FindPost {
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
    console.log(this.post)
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

module.exports = FindPost
