const homeHelperFunction = require("../helperFunction/home")

async function getFeed(req, res, next) {
  try {
    const posts = await homeHelperFunction.getFeed(req.body)

    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getFeed
}
