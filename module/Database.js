const { ObjectID } = require("mongodb")

const db = require("../db")

class DatabaseSave {
  constructor(collection, data) {
    this.collection = db.collection(collection)
    this.data = data
    this.error = []
  }

  async saveOne() {
    try {
      await this.collection.insertOne(this.data)
    } catch (err) {
      const error = new Error(err)
      error.status = 500
      throw error
    }
  }
}

class DatabaseFind {
  constructor(collection, querry) {
    this.collection = db.collection(collection)
    this.querry = querry
  }

  async findWithQuerry() {
    try {
      return await this.collection.find(this.querry).toArray()
    } catch (err) {
      const error = new Error(err)
      error.status = 500
      throw error
    }
  }

  async findOneWithQuerry() {
    try {
      return await this.collection.findOne(this.querry)
    } catch (err) {
      const error = new Error(err)
      error.status = 500
      throw error
    }
  }
}

module.exports = { DatabaseSave, DatabaseFind }
