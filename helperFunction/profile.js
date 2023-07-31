const { GetFollowers } = require("../module/Followers")

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

module.exports = {
  getFollowers
}
