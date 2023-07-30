const loginHelperFunction = require("../helperFunction/login")

async function loginEmail(req, res, next) {
  try {
    const token = await loginHelperFunction.loginWithEmail(req.body)

    res.status(200).json({ message: "Successful login.", token, isLogedIn: true })
  } catch (err) {
    next(err)
  }
}

async function loginCardano(req, res) {}

async function validateLogin(req, res, next) {
  try {
    req.body.username = await loginHelperFunction.validateLogin(req.headers.authorization)
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  validateLogin,
  loginEmail
}
