require("dotenv").config()
const { MongoClient } = require("mongodb")

const client = new MongoClient(process.env.MONGODBCONNECTIONSTRING)

async function start() {
  try {
    await client.connect()
    const db = client.db("socialmedia-platform")
    module.exports = db
    const server = require("./index.js")
    server.listen(3000)
  } catch (err) {
    console.log(err)
  }
}

start()
