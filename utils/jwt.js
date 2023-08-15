require("dotenv").config()
const jwt = require("jsonwebtoken")

function generateJwt(data) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //1 day
      data: {
        username: data.username,
        userId: data.userId
      }
    },
    process.env.JWTSECRET
  )
}

module.exports = {
  generateJwt
}
