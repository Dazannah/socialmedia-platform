require("dotenv").config()
const jwt = require("jsonwebtoken")

function generateJwt(data) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60, //1 day
      data: {
        data
      }
    },
    process.env.JWTSECRET
  )
}

module.exports = {
  generateJwt
}
