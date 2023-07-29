const ValidateLogin = require("../module/ValidateLogin")

async function validateLogin(authHeader) {
  const validateLogin = new ValidateLogin(authHeader)
  validateLogin.checkIfAuthHeaderExist()
  validateLogin.getJwt()
  const username = await validateLogin.validateJwt()

  return username
}

module.exports = {
  validateLogin
}
