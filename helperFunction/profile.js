const { GetFollowers, GetFollowing } = require("../module/Followers")
const { GetProfile } = require("../module/Profile")

async function getFollowers(data) {
  const username = data.params.username

  const getFollowers = new GetFollowers(username, "followedId")
  await getFollowers.isUserExist()
  await getFollowers.getFollowDocuments()
  getFollowers.getUserIdsArray()
  await getFollowers.getUserDocuments()
  const usernames = getFollowers.getUsernameFromUserDocuments()

  return usernames
}

async function getFollowing(data) {
  const username = data.params.username

  const gerFollowing = new GetFollowing(username, "userId")
  await gerFollowing.isUserExist()
  await gerFollowing.getFollowDocuments()
  gerFollowing.getUserIdsArray()
  await gerFollowing.getUserDocuments()

  const following = gerFollowing.getUsernameFromUserDocuments()
  return following
}

async function getUserProfile(data) {
  const username = data.params.username

  const getProfile = new GetProfile(username)
  await getProfile.isValidUsername()
  await getProfile.getUserPosts()
  const dataTosend = getProfile.serializeDataToSend()

  return dataTosend
}

module.exports = {
  getFollowers,
  getFollowing,
  getUserProfile
}
