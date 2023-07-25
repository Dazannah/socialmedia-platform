const sanitizeHtml = require("sanitize-html")

function sanitazeBody(req, res, next) {
  sanitazeObject(req.body)
  next()
}

function sanitazeObject(body) {
  for (const key in body) {
    if (typeof body[key] === "string") body[key] = sanitizeHtml(body[key])

    if (Array.isArray(body[key])) {
      body[key].forEach((element, index) => {
        if (typeof element === "string") {
          body[key][index] = sanitizeHtml(element)
        }
      })
    }

    if (Object.prototype.toString.call(body[key]) === "[object Object]") {
      sanitazeObject(body[key])
    }
  }
}

module.exports = sanitazeBody
