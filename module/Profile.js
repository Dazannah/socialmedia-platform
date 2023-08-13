const { DatabaseFind } = require("../module/Database")
const { SearchPostsByUserId } = require("../module/Post")
const { getUsernameRegex } = require("../utils/regex")
const { throwErrorArray } = require("../utils/errors")

class GetProfile {
  constructor(username, requesterUsername) {
    this.username = username
    this.requesterUsername = requesterUsername
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
    const searchPostsByUsername = new SearchPostsByUserId(this.userData._id)
    this.posts = await searchPostsByUsername.getPosts()
  }

  isThereAnyPost() {
    if (!this.posts) this.error.push(`${this.userData.username} don't have any post.`)
    throwErrorArray(this.error, 200)
  }

  changeAuthorFieldToUsername() {
    this.posts.forEach(post => {
      post.author = this.username
    })
  }

  serializeDataToSend(followers, following) {
    const userDataToSend = {}
    userDataToSend.username = this.userData.username
    userDataToSend.followers = followers
    userDataToSend.following = following
    userDataToSend.isFollowed = false
    this.profileData = this.posts
    this.profileData.push(userDataToSend)
  }

  isFollowed() {
    const requesterUsernameRegex = getUsernameRegex(this.requesterUsername)

    this.profileData[this.profileData.length - 1].followers.forEach(follower => {
      if (requesterUsernameRegex.test(follower)) {
        this.profileData[this.profileData.length - 1].isFollowed = true
        return
      }
    })

    return this.profileData
  }
}

module.exports = {
  GetProfile
}
