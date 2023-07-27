const express = require("express")
const app = express()

const router = require("./router")

const sanitazeBody = require("./middlewares/sanitazeBody")

app.use(express.json())
app.use(express.static("public"))
app.use(sanitazeBody)

app.get("/", (req, res) => {
  res.send("index.html")
})

app.use("/", router)

const server = require("http").createServer(app)

app.use((err, req, res, next) => {
  res.status(err.status).json(err.data)
})

module.exports = server
