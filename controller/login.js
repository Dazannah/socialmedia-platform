const RegisterEmail = require("../module/RegisterEmail")
const RegisterCardano = require("../module/RegisterCardano")

async function registerEmail(req, res) {
  try {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const register = new RegisterEmail(username, password, email)
    register.validate()
    await register.findExisting()

    res.status(201).json("ok")
  } catch (err) {
    console.log(err)
    res.status(err.status).json(err.data)
  }
}

async function registerCardano(req, res) {
  const register = new RegisterCardano()
}

async function loginEmail(req, res) {
  console.log(req.body)
  res.status(200).json("ok")
}

async function loginCardano(req, res) {
  console.log(req.body)
  res.status(200).json("ok")
}

module.exports = {
  registerEmail,
  registerCardano,
  loginEmail,
  loginCardano
}
