const registrationInterface = require("../interfaces/registration")

const RegisterCardano = require("../module/RegisterCardano")

async function registerEmail(req, res, next) {
  try {
    await registrationInterface.registrationWithEmail(req.body)

    res.status(201).json("Successful registration.")
  } catch (err) {
    res.status(err.status).json(err.data)
  }
}

async function registerCardano(req, res) {
  const register = new RegisterCardano()
}

async function loginEmail(req, res) {
  try {
  } catch (err) {
    res.status(err.status).json(err.data)
  }
  res.status(200).json("ok")
}

async function loginCardano(req, res) {
  res.status(200).json("ok")
}

module.exports = {
  registerEmail,
  registerCardano,
  loginEmail,
  loginCardano
}
