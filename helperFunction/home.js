const { GetFollowing } = require("../module/Followers")
const { FindAllPostsByUserIds, ChangeUserIdInPosts } = require("../module/Post")

async function getFeed(data) {
  const username = data.username

  const getFollowing = new GetFollowing(username, "userId")
  await getFollowing.isUserExist()
  await getFollowing.getFollowDocuments()
  getFollowing.getUserIdsArray()
  const followingIds = getFollowing.idArray

  const findAllPostsByUserIds = new FindAllPostsByUserIds(followingIds)
  const posts = await findAllPostsByUserIds.getAllPosts()

  const changeUserIdInPosts = new ChangeUserIdInPosts(posts, followingIds)
  await changeUserIdInPosts.getFollowingUsers()
  const postsWithUsername = changeUserIdInPosts.swapIdToUsername()

  return postsWithUsername
}

module.exports = {
  getFeed
}
