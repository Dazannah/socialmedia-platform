const { GetFollowers, GetFollowing } = require("../module/Followers")

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

module.exports = {
  getFollowers,
  getFollowing
}
