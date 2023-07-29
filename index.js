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

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json("Something went wrong.")
})

const server = require("http").createServer(app)

module.exports = server
