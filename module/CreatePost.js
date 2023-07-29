const { throwErrorArray, throwErrorSingle } = require("../utils/errors")
const { DatabaseFind, DatabaseSave } = require("./Database")

class CreatePost {
  constructor(username, postTitle, postBody, postCreateDate) {
    this.username = username
    this.postTitle = postTitle
    this.postBody = postBody
    this.postCreateDate = postCreateDate
    this.error = []
  }

  validatePostForCreate() {
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

  async savePost() {
    const databaseSave = new DatabaseSave("userCreatedPosts", { postTitle: this.postTitle, postBody: this.postBody, postCreateDate: this.postCreateDate })
    await databaseSave.saveOne()
  }
}

module.exports = CreatePost
