const { DatabaseFind } = require("../module/Database")
const { throwErrorArray } = require("../utils/errors")
const { getCaseInsensitiveRegex } = require("../utils/regex")

class ValidateEmailRegistration {
  constructor(username, password, passwordRepeate, email) {
    this.username = username
    this.password = password
    this.passwordRepeate = passwordRepeate
    this.email = email
    this.error = []
  }

  validateUsernamePasswordEmail() {
    if (this.username === undefined || this.username === null || this.username.trim() === "") this.error.push("You must provide a username.")
    if (this.password === undefined || this.password === null || this.password === "") this.error.push("You must provide a password.")
    if (this.password != this.passwordRepeate) this.error.push("The password must match.")

    //username validation
    const alphaNumeric = /[0-9a-zA-Z]/
    if (!alphaNumeric.test(this.username)) this.error.push("The user name can contain only english alphabet letters, and numbers.")

    //validate password
    const capitalCaseRegex = /^(?=.*\d)[A-Z0-9].{8,16}$/
    if (!capitalCaseRegex.test(this.password)) this.error.push("The password must have at least one upper case letter and a number, and the length hase to be between 8 and 16 letter.")

    //validate email
    if (this.email === undefined || this.email === null || this.email === "") this.error.push("You must provide an e-mail address.")

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(this.email)) this.error.push("You must provide a valid e-mail address.")

    throwErrorArray(this.error, 409)
  }

  async findIfExistUsernameEmail() {
    const usernameRegex = getCaseInsensitiveRegex(this.username)
    const emailRegex = getCaseInsensitiveRegex(this.email)
    const databaseWithQuerry = new DatabaseFind("users", { $or: [{ username: { $regex: usernameRegex } }, { email: { $regex: emailRegex } }] })
    const result = await databaseWithQuerry.findWithQuerry()

    if (result.length > 0) this.error.push("This username/e-mail is already in use.")

    throwErrorArray(this.error, 409)
  }
}

module.exports = ValidateEmailRegistration
