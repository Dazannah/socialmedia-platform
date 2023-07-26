const { ObjectID } = require("mongodb")
const { throwError } = require("../utils/errors")

const db = require("../db")

class Database {
  constructor(data, collection) {
    this.data = data
    this.collection = collection
  }

  async save() {
    try {
      await db.collection(this.collection).insertOne(this.data)
    } catch (err) {
      throwError(err, 500)
    }
  }
}

module.exports = Database
