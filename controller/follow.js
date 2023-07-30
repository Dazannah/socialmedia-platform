const followHelperFunction = require("../helperFunction/follow")

async function addFollow(req, res, next) {
  try {
    const followedName = await followHelperFunction.addFollow(req)

    res.status(200).json(`You started to following ${followedName}`)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  addFollow
}
