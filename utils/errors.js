function throwError(errorData, statusCode) {
  const error = new Error()
  error.data = errorData
  error.status = statusCode
  throw error
}

module.exports = {
  throwError
}
