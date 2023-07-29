const userHelperFunction = require("../helperFunction/user")

async function registerEmail(req, res, next) {
  try {
    await userHelperFunction.registrationWithEmail(req.body)

    res.status(201).json("Successful registration.")
  } catch (err) {
    res.status(err.status).json(err.data)
  }
}

async function registerCardano(req, res) {}

async function loginEmail(req, res) {
  try {
    const token = await userHelperFunction.loginWithEmail(req.body)

    res.status(200).json({ message: "Successful login.", token })
  } catch (err) {
    console.log(err)
    res.status(err.status).json(err.data)
  }
}

async function loginCardano(req, res) {}

module.exports = {
  registerEmail,
  registerCardano,
  loginEmail,
  loginCardano
}
