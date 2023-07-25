const usersDb = require("../db").collection("users")
const { throwErrorArray } = require("../utils/errors")

class RegisterEmail {
  constructor(username, password, email) {
    this.username = username
    this.password = password
    this.email = email
    this.error = []
  }

  validate() {
    if (this.username === undefined || this.username === null || this.username.trim() === "") this.error.push("You must provide a username.")
    if (this.password === undefined || this.password === null || this.password === "") this.error.push("You must provide a password.")

    //validate email
    if (this.email === undefined || this.email === null || this.email === "") this.error.push("You must provide an e-mail address.")

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(this.email)) this.error.push("You must provide a valid e-mail address.")

    throwErrorArray(this.error, 409)
  }

  async findExisting() {
    //megnézni ezeket össze birom-e hozni 1 db lekérdezésbe

    const usernameResult = await usersDb.findOne({ username: this.username })
    if (usernameResult) this.error.push("This username is already in use.")

    const emailResult = await usersDb.findOne({ email: this.email })
    if (emailResult) this.error.push("This e-mail address is already in use.")

    throwErrorArray(this.error, 409)
  }
}

module.exports = RegisterEmail
