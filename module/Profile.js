const { DatabaseFind } = require("../module/Database")
const { getUsernameRegex } = require("../utils/regex")
const { throwErrorArray } = require("../utils/errors")

class GetProfile {
  constructor(username) {
    this.username = username
    this.userData
    this.error = []
  }

  async isValidUsername() {
    const usernameRegex = getUsernameRegex(this.username)

    const database = new DatabaseFind("users", { username: { $regex: usernameRegex } })
    this.userData = await database.findOneWithQuerry()

    if (!this.userData) this.error.push("Can't find this user.")
    throwErrorArray(this.error, 409)
  }

  async getUserPosts() {
    const database = new DatabaseFind("userCreatedPosts", { author: this.userData._id })
    this.posts = await database.findById()

    if (!this.posts) this.error.push(`${this.username} don't have any post.`)
    throwErrorArray(this.error, 200)
  }

  serializeDataToSend() {
    const userDataToSend = {}
    userDataToSend.username = this.userData.username
    this.posts.push(userDataToSend)

    return this.posts
  }
}

module.exports = {
  GetProfile
}
