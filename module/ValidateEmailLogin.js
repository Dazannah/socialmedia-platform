const { throwErrorArray } = require("../utils/errors")
const { DatabaseFind } = require("../module/Database")
const { PasswordCompare } = require("../module/PasswordHash")

class ValidateEmailLogin {
  constructor(username, password) {
    this.username = username
    this.password = password
    this.passwordToCompare = ""
    this.error = []
  }

  validateInputs() {
    if (this.username === "") this.error.push("Username have to be filled.")
    if (this.password === "") this.error.push("Password have to be filled.")

    throwErrorArray(this.error, 409)
  }

  async isUserExist() {
    const databaseFind = new DatabaseFind("users", { username: this.username })
    const isUserExist = await databaseFind.findOneWithQuerry()

    if (!isUserExist) this.error.push("Username/password incorrect.")

    throwErrorArray(this.error, 409)

    this.userId = isUserExist._id.toString()
    this.passwordToCompare = isUserExist.password
  }

  async isPasswordValid() {
    const passwordCompare = new PasswordCompare(this.password, this.passwordToCompare)
    const isItMatch = await passwordCompare.comparePassword()

    if (!isItMatch) this.error.push("Username/password incorrect.")

    throwErrorArray(this.error, 409)
  }
}

module.exports = ValidateEmailLogin
