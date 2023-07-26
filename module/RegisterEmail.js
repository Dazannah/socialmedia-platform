const usersDb = require("../db").collection("users")
const { throwError } = require("../utils/errors")
const Database = require("./Database")
const bcrypt = require("bcrypt")

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

    const capitalCaseRegex = /[A-Z0-9]/
    if (!capitalCaseRegex.test(this.password)) this.error.push("At least one upper case letter and a number have to be used.")
    if (this.password.length < 8) this.error.push("The password have to be at least 8 character long.")

    //validate email
    if (this.email === undefined || this.email === null || this.email === "") this.error.push("You must provide an e-mail address.")

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(this.email)) this.error.push("You must provide a valid e-mail address.")

    if (this.error.length > 0) {
      throwError(this.error, 409)
    }
  }

  async findExisting() {
    const result = await usersDb.find({ $or: [{ username: this.username }, { email: this.email }] }).toArray()
    result.forEach(element => {
      if (element.username === this.username) this.error.push("This username is already in use.")
      if (element.email === this.email) this.error.push("This e-mail address is already in use.")
    })

    if (this.error.length > 0) {
      throwError(this.error, 409)
    }
  }

  async encryptPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10)
    } catch (err) {
      throwError(err, 500)
    }
  }

  prepareDataToSave() {
    this.dataToSave = {
      username: this.username,
      password: this.password,
      email: this.email,
      emailValidated: false
    }
  }

  async save() {
    try {
      const database = new Database(this.dataToSave, "users")
      await database.save()
    } catch (err) {
      throwError(err, 500)
    }
  }
}

module.exports = RegisterEmail
