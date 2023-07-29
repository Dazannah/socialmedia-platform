const { ObjectId } = require("mongodb")

const db = require("../db")

class DatabaseSave {
  constructor(collection, data) {
    this.collection = db.collection(collection)
    this.data = data
    this.error = []
  }

  async saveOne() {
    await this.collection.insertOne(this.data)
  }
}

class DatabaseFind {
  constructor(collection, querry) {
    this.collection = db.collection(collection)
    this.querry = querry
  }

  async findWithQuerry() {
    return await this.collection.find(this.querry).toArray()
  }

  async findOneWithQuerry() {
    return await this.collection.findOne(this.querry)
  }

  async findOneById() {
    this.querry = { _id: new ObjectId(this.querry._id) }
    return await this.findOneWithQuerry()
  }
}

module.exports = { DatabaseSave, DatabaseFind }
