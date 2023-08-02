const ValidateEmailRegistration = require("../module/ValidateEmailRegistration")
const { PasswordHash } = require("../module/PasswordHash")
const { SerializeEmailRegistrationData } = require("../module/Serialization")
const { DatabaseSave } = require("../module/Database")

const EmailVerification = require("../module/EmailVerification")

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

  const emailVerification = new EmailVerification(validate.email, validate.username)
  emailVerification.generateRandomString()
  //generate link
  //save link in database
  //send email with link
}

module.exports = {
  registrationWithEmail
}
