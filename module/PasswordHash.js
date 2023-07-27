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

module.exports = PasswordHash
