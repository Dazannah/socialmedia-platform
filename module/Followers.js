const { DatabaseFind } = require("../module/Database")
const { throwErrorArray } = require("../utils/errors")
const { getUsernameRegex } = require("../utils/regex")

class Followers {
  constructor(username, fieldToFind) {
    this.username = username
    this.fieldToFind = fieldToFind
    this.idArray = []
    this.usernameArray = []
    this.error = []
  }

  async isUserExist() {
    const regex = getUsernameRegex(this.username)
    const databaseFind = new DatabaseFind("users", { username: { $regex: regex } })
    const result = await databaseFind.findOneWithQuerry()

    if (!result) this.error.push("This user don't exist.")

    throwErrorArray(this.error, 200)

    this.userId = result._id
  }

  async getFollowDocuments() {
    const databaseFind = new DatabaseFind("follow", { [this.fieldToFind]: this.userId })
    this.followDocuments = await databaseFind.findWithQuerry()
  }

  async getUserDocuments() {
    const databaseFind = new DatabaseFind("users", { _id: { $in: this.idArray } })
    this.userDocuments = await databaseFind.findWithQuerry()
  }

  getUsernameFromUserDocuments() {
    this.userDocuments.forEach(user => {
      this.usernameArray.push(user.username)
    })

    return this.usernameArray
  }
}

class GetFollowers extends Followers {
  constructor(username, fieldToFind) {
    super(username, fieldToFind)
  }

  getUserIdsArray() {
    this.followDocuments.forEach(document => {
      this.idArray.push(document.userId)
    })
  }
}

module.exports = {
  GetFollowers
}
