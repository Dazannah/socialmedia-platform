const { DatabaseFind } = require("../module/Database")
const { throwErrorArray } = require("../utils/errors")

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
    const databaseWithQuerry = new DatabaseFind("users", { $or: [{ username: this.username }, { email: this.email }] })
    const result = await databaseWithQuerry.findWithQuerry()

    if (result.length > 0) this.error.push("This username/e-mail is already in use.")

    throwErrorArray(this.error, 409)
  }
}

module.exports = ValidateEmailRegistration
