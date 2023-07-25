const express = require("express")

const router = require("./router")

const app = express()

app.use(express.json())
app.use(express.static("public"))

app.use("/", router)

const server = require("http").createServer(app)

module.exports = server
