function throwErrorArray(errorData, statusCode) {
  if (errorData.length > 0) {
    const error = new Error()
    error.data = errorData
    error.status = statusCode
    res.status(err.status).json(err.data)
  }
}

function throwErrorSingle(errorData, statusCode) {
  const error = new Error()
  error.data = errorData
  error.status = statusCode
  res.status(err.status).json(err.data)
}

module.exports = {
  throwErrorArray,
  throwErrorSingle
}
