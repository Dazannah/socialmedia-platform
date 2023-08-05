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
    const querryKeys = Object.keys(this.querry)
    this.querry = { [querryKeys[0]]: new ObjectId(this.querry[querryKeys[0]]) }

    return await this.findOneWithQuerry()
  }

  async findById() {
    const querryKeys = Object.keys(this.querry)
    this.querry = { [querryKeys[0]]: new ObjectId(this.querry[querryKeys[0]]) }

    return await this.findWithQuerry()
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

class DatabaseDeleteWithQuerry {
  constructor(collection, querry) {
    this.collection = db.collection(collection)
    this.querry = querry
  }

  async deleteOne() {
    await this.collection.findOneAndDelete(this.querry)
  }
}

module.exports = {
  DatabaseSave,
  DatabaseFind,
  DatabaseUpdate,
  DatabaseDelete,
  DatabaseDeleteWithQuerry
}
