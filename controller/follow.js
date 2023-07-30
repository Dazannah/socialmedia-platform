const followHelperFunction = require("../helperFunction/follow")

async function addFollow(req, res, next) {
  try {
    const followedName = await followHelperFunction.addFollow(req)

    res.status(200).json(`You started to following ${followedName}`)
  } catch (err) {
    next(err)
  }
}

async function removeFollow(req, res, next) {
  try {
    const removedFollow = await followHelperFunction.removeFollow(req)

    res.status(200).json(`You stopped following ${removedFollow}`)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  addFollow,
  removeFollow
}
