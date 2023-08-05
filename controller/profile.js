const helperFunctionProfile = require("../helperFunction/profile")

async function getFollowers(req, res, next) {
  try {
    const followers = await helperFunctionProfile.getFollowers(req)

    res.status(200).json({ followers })
  } catch (err) {
    next(err)
  }
}

async function getFollowing(req, res, next) {
  try {
    const follows = await helperFunctionProfile.getFollowing(req)

    res.status(200).json({ follows })
  } catch (err) {
    next(err)
  }
}

async function getUserProfile(req, res, next) {
  try {
    const userProfile = await helperFunctionProfile.getUserProfile(req)

    res.status(200).json({ userProfile }) //always last in array the user data
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getFollowers,
  getFollowing,
  getUserProfile
}
