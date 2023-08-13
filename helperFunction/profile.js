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

  const getFollowing = new GetFollowing(username, "userId")
  await getFollowing.isUserExist()
  await getFollowing.getFollowDocuments()
  getFollowing.getUserIdsArray()
  await getFollowing.getUserDocuments()

  const following = getFollowing.getUsernameFromUserDocuments()
  return following
}

async function getUserProfile(data) {
  const requesterUsername = data.body.username
  const username = data.params.username

  const getProfile = new GetProfile(username, requesterUsername)
  await getProfile.isValidUsername()
  await getProfile.getUserPosts()
  getProfile.isThereAnyPost()
  getProfile.changeAuthorFieldToUsername()

  const followers = await getFollowers(data)
  const following = await getFollowing(data)

  getProfile.serializeDataToSend(followers, following)

  const dataTosend = getProfile.isFollowed()

  return dataTosend
}

module.exports = {
  getFollowers,
  getFollowing,
  getUserProfile
}
