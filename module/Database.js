const { ObjectId } = require("mongodb")

const db = require("../db")

class DatabaseSave {
  constructor(collection, data) {
    this.collection = db.collection(collection)
    this.data = data
    this.error = []
  }

  async saveOne() {
    return await this.collection.insertOne(this.data)
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

class DatabaseUpdate {
  constructor(collection, idToUpdate, data) {
    this.collection = db.collection(collection)
    this.idToUpdate = idToUpdate
    this.data = data
  }

  async updateOne() {
    await this.collection.updateOne({ _id: new ObjectId(this.idToUpdate) }, { $set: this.data })
  }
}

class DatabaseDelete {
  constructor(collection, idToDelete) {
    this.collection = db.collection(collection)
    this.idToDelete = idToDelete
  }

  async deleteOne() {
    await this.collection.deleteOne({ _id: new ObjectId(this.idToDelete) })
  }
}

module.exports = {
  DatabaseSave,
  DatabaseFind,
  DatabaseUpdate,
  DatabaseDelete
}
