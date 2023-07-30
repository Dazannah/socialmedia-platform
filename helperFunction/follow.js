const Follow = require("../module/Follow")

async function addFollow(data) {
  const usernameToFollow = data.params.username
  const userId = data.body.userId

  const follow = new Follow(userId, usernameToFollow)
  follow.generateQuerry()
  await follow.isUserToFollowExist()
  await follow.isAlreadyFollow()
  follow.generateFollowData()
  await follow.saveFollow()

  return usernameToFollow
}

module.exports = {
  addFollow
}
