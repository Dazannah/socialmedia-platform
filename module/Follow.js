const { DatabaseFind, DatabaseSave } = require("./Database")
const { throwErrorArray } = require("../utils/errors")
const { ObjectId } = require("mongodb")

class Follow {
  constructor(userId, usernameToFollow) {
    this.userId = userId
    this.usernameToFollow = usernameToFollow
    this.error = []
  }

  generateQuerry() {
    const regex = new RegExp(`^${this.usernameToFollow}$`, "i")
    this.querry = { username: { $regex: regex } }
  }

  async isUserToFollowExist() {
    const databaseFind = new DatabaseFind("users", this.querry)
    const userToFollow = await databaseFind.findOneWithQuerry()

    if (!userToFollow) this.error.push("This user don't exist.")
    throwErrorArray(this.error, 200)

    this.userIdToFollow = userToFollow._id
  }

  async isAlreadyFollow() {
    const databaseFind = new DatabaseFind("follow", { $and: [{ userId: new ObjectId(this.userId) }, { followedId: new ObjectId(this.userIdToFollow) }] })
    const alreadyFollow = await databaseFind.findOneWithQuerry()

    if (alreadyFollow) this.error.push(`You already follow ${this.usernameToFollow}`)
    throwErrorArray(this.error, 200)
  }

  generateFollowData() {
    this.dataToSave = {
      userId: new ObjectId(this.userId),
      followedId: new ObjectId(this.userIdToFollow)
    }
  }

  async saveFollow() {
    const databaseSave = new DatabaseSave("follow", this.dataToSave)
    await databaseSave.saveOne()
  }
}

module.exports = Follow
