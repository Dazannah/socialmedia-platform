const jwt = require("jsonwebtoken")
require("dotenv").config()
const { throwErrorSingle } = require("../utils/errors")

class ValidateLogin {
  constructor(authHeader) {
    this.authHeader = authHeader
  }

  checkIfAuthHeaderExist() {
    if (!this.authHeader) throwErrorSingle("You have to provide auhorization header bearer token.", 401)
  }

  getJwt() {
    this.token = this.authHeader.split(" ")[1]
  }

  async validateJwt() {
    try {
      const result = jwt.verify(this.token, process.env.JWTSECRET)
      return result.data.username
    } catch (err) {
      throwErrorSingle("Invalid JSON Web Token.", 401)
    }
  }
}

module.exports = ValidateLogin
