const ValidateEmailRegistration = require("../module/ValidateEmailRegistration")
const ValidateEmailLogin = require("../module/ValidateEmailLogin")
const { PasswordHash } = require("../module/PasswordHash")
const { SerializeEmailRegistrationData } = require("../module/Serialization")
const { DatabaseSave, DatabaseFind } = require("../module/Database")
const { generateJwt } = require("../utils/jwt")

async function registrationWithEmail(body) {
  const username = body.username
  const password = body.password
  const passwordRepeate = body.passwordRepeate
  const email = body.email

  const validate = new ValidateEmailRegistration(username, password, passwordRepeate, email)
  validate.validateUsernamePasswordEmail()
  await validate.findIfExistUsernameEmail()

  const passwordHash = new PasswordHash(validate.password)
  const encryptedPassword = await passwordHash.encryptPassword()

  const serializeEmailRegistration = new SerializeEmailRegistrationData(validate.username, encryptedPassword, validate.email)
  const dataToSave = serializeEmailRegistration.prepareDataToSave()

  const databaseSave = new DatabaseSave("users", dataToSave)
  await databaseSave.saveOne()
}

async function loginWithEmail(body) {
  const username = body.username
  const password = body.password

  const validateEmailLogin = new ValidateEmailLogin(username, password)
  validateEmailLogin.validateInputs()
  await validateEmailLogin.isUserExist()
  await validateEmailLogin.isPasswordValid()

  return generateJwt(username)
}

module.exports = {
  registrationWithEmail,
  loginWithEmail
}
