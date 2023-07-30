const { StartFollow, StopFollow } = require("../module/Follow")

async function addFollow(data) {
  const userId = data.body.userId
  const usernameToFollow = data.params.username

  const startFollow = new StartFollow(userId, usernameToFollow)
  startFollow.generateQuerry()
  await startFollow.isUserToFollowExist()
  await startFollow.isAlreadyFollow()
  startFollow.generateFollowData()
  await startFollow.saveFollow()

  return usernameToFollow
}

async function removeFollow(data) {
  const userId = data.body.userId
  const usernameToStopFollow = data.params.username

  const stopFollow = new StopFollow(userId, usernameToStopFollow)
  stopFollow.generateQuerry()
  await stopFollow.isUserToFollowExist()
  await stopFollow.isFollow()
  stopFollow.generateQuerryForDelete()
  await stopFollow.delete()

  return usernameToStopFollow
}

module.exports = {
  addFollow,
  removeFollow
}
