const { DatabaseFind } = require("../module/Database")
const { throwErrorArray } = require("../utils/errors")

class ValidateEmailRegistration {
  constructor(username, password, email) {
    this.username = username
    this.password = password
    this.email = email
    this.error = []
  }

  validateUsernamePasswordEmail() {
    if (this.username === undefined || this.username === null || this.username.trim() === "") this.error.push("You must provide a username.")
    if (this.password === undefined || this.password === null || this.password === "") this.error.push("You must provide a password.")

    const capitalCaseRegex = /[A-Z0-9]/
    if (!capitalCaseRegex.test(this.password)) this.error.push("At least one upper case letter and a number have to be used.")
    if (this.password.length < 8) this.error.push("The password have to be at least 8 character long.")

    //validate email
    if (this.email === undefined || this.email === null || this.email === "") this.error.push("You must provide an e-mail address.")

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(this.email)) this.error.push("You must provide a valid e-mail address.")

    throwErrorArray(this.error, 409)
  }

  async findIfExistUsernameEmail() {
    const databaseWithQuerry = new DatabaseFind("users", { $or: [{ username: this.username }, { email: this.email }] })
    const result = await databaseWithQuerry.findWithQuerry()

    if (result.length > 0) {
      result.forEach(element => {
        if (element.username === this.username) this.error.push("This username is already in use.")
        if (element.email === this.email) this.error.push("This e-mail address is already in use.")
      })
    }

    throwErrorArray(this.error, 409)
  }
}

module.exports = ValidateEmailRegistration
