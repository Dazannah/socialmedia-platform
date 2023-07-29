function errorHandler(err, req, res, next) {
  console.log(err)
  if (err.status || err.data) {
    res.status(err.status).json(err.data)
  } else {
    res.status(500).json("Something went wrong.")
  }
}

module.exports = errorHandler
