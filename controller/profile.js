const helperFunctionProfile = require("../helperFunction/profile")

async function getFollowers(req, res, next) {
  try {
    const followers = await helperFunctionProfile.getFollowers(req)

    res.status(200).json({ followers })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getFollowers
}
