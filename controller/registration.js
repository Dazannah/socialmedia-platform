const registrationHelperFunction = require("../helperFunction/registration")

async function registerEmail(req, res, next) {
  try {
    await registrationHelperFunction.registrationWithEmail(req.body)

    res.status(201).json("Successful registration.")
  } catch (err) {
    next(err)
  }
}

async function registerCardano(req, res, next) {}

module.exports = {
  registerEmail,
  registerCardano
}
