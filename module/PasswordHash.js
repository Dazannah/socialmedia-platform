const bcrypt = require("bcrypt")

class PasswordHash {
  constructor(password) {
    this.password = password
  }

  async encryptPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10)
      return this.password
    } catch (err) {
      const error = new Error(err)
      error.status = 500
      throw error
    }
  }
}

class PasswordCompare {
  constructor(password, passwordToCompare) {
    this.password = password
    this.passwordToCompare = passwordToCompare
  }

  async comparePassword() {
    try {
      return await bcrypt.compare(this.password, this.passwordToCompare)
    } catch (err) {
      const error = new Error(err)
      error.status = 500
      throw error
    }
  }
}

module.exports = { PasswordHash, PasswordCompare }
