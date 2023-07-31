const express = require("express")
const app = express()

const router = require("./router")

const sanitazeBody = require("./middlewares/sanitazeBody")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(express.static("public"))
app.use(sanitazeBody)

app.get("/", (req, res) => {
  res.send("index.html")
})

app.use("/", router) // when frontend start rename to /api

app.use(errorHandler)

const server = require("http").createServer(app)

module.exports = server
