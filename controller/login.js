const loginHelperFunction = require("../helperFunction/login")

async function validateLogin(req, res, next) {
  try {
    req.body.username = await loginHelperFunction.validateLogin(req.headers.authorization)
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  validateLogin
}
