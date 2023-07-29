const loginHelperFunction = require("../helperFunction/login")

async function validateLogin(req, res, next) {
  try {
    req.body.username = await loginHelperFunction.validateLogin(req.headers.authorization)
    next()
  } catch (err) {
    console.log(err)
    res.status(err.status).json(err.data)
  }
}

module.exports = {
  validateLogin
}
