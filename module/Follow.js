const { DatabaseFind, DatabaseSave, DatabaseDeleteWithQuerry } = require("./Database")
const { throwErrorArray } = require("../utils/errors")
const { ObjectId } = require("mongodb")

class Follow {
  constructor(userId, followUsername) {
    this.userId = userId
    this.followUsername = followUsername
    this.error = []
  }

  generateQuerry() {
    const regex = new RegExp(`^${this.followUsername}$`, "i")
    this.querry = { username: { $regex: regex } }
  }

  async isUserToFollowExist() {
    const databaseFind = new DatabaseFind("users", this.querry)
    const userToFollow = await databaseFind.findOneWithQuerry()

    if (!userToFollow) this.error.push("This user don't exist.")
    throwErrorArray(this.error, 200)

    this.userIdToFollow = userToFollow._id
  }

  async isFollowing() {
    const databaseFind = new DatabaseFind("follow", { $and: [{ userId: new ObjectId(this.userId) }, { followedId: new ObjectId(this.userIdToFollow) }] })
    const alreadyFollow = await databaseFind.findOneWithQuerry()

    if (alreadyFollow) {
      return true
    } else {
      return false
    }
  }
}

class StartFollow extends Follow {
  constructor(userId, usernameToFollow) {
    super(userId, usernameToFollow)
  }

  async isAlreadyFollow() {
    const alreadyFollow = await this.isFollowing()

    if (alreadyFollow) this.error.push(`You already follow ${this.followUsername}`)
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

class StopFollow extends Follow {
  constructor(userId, usernameToStopFollow) {
    super(userId, usernameToStopFollow)
  }

  async isFollow() {
    const alreadyFollow = await this.isFollowing()

    if (!alreadyFollow) this.error.push(`You don't follow ${this.followUsername}`)
    throwErrorArray(this.error, 200)
  }

  generateQuerryForDelete() {
    this.querryForDelete = {
      userId: new ObjectId(this.userId),
      followedId: new ObjectId(this.userIdToFollow)
    }
  }

  async delete() {
    const databaseDeleteWithQuerry = new DatabaseDeleteWithQuerry("follow", this.querryForDelete)
    await databaseDeleteWithQuerry.deleteOne()
  }
}

module.exports = { Follow, StartFollow, StopFollow }
