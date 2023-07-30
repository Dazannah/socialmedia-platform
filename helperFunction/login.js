const ValidateLogin = require("../module/ValidateLogin")
const ValidateEmailLogin = require("../module/ValidateEmailLogin")
const { generateJwt } = require("../utils/jwt")

async function loginWithEmail(body) {
  const username = body.username
  const password = body.password

  const validateEmailLogin = new ValidateEmailLogin(username, password)
  validateEmailLogin.validateInputs()
  await validateEmailLogin.isUserExist()
  await validateEmailLogin.isPasswordValid()

  const userId = validateEmailLogin.userId

  return generateJwt({ username: username, userId })
}

async function validateLogin(authHeader) {
  const validateLogin = new ValidateLogin(authHeader)
  validateLogin.checkIfAuthHeaderExist()
  validateLogin.getJwt()
  const username = await validateLogin.validateJwt()

  return username
}

module.exports = {
  validateLogin,
  loginWithEmail
}
