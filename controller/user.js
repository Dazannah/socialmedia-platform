const userHelperFunction = require("../helperFunction/user")

async function registerEmail(req, res, next) {
  try {
    await userHelperFunction.registrationWithEmail(req.body)

    res.status(201).json("Successful registration.")
  } catch (err) {
    next(err)
  }
}

async function registerCardano(req, res, next) {}

async function loginEmail(req, res, next) {
  try {
    const token = await userHelperFunction.loginWithEmail(req.body)

    res.status(200).json({ message: "Successful login.", token, isLogedIn: true })
  } catch (err) {
    next(err)
  }
}

async function loginCardano(req, res) {}

module.exports = {
  registerEmail,
  registerCardano,
  loginEmail,
  loginCardano
}
