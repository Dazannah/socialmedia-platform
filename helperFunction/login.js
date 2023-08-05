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

  const token = generateJwt({ username: username, userId })

  return { token, username }
}

async function validateLogin(authHeader) {
  const validateLogin = new ValidateLogin(authHeader)
  validateLogin.checkIfAuthHeaderExist()
  validateLogin.getJwt()
  const jwtData = await validateLogin.validateJwt()

  return jwtData
}

module.exports = {
  validateLogin,
  loginWithEmail
}
