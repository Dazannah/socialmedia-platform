function throwErrorArray(array, statusCode) {
  if (array.length > 0) {
    const error = new Error()
    error.data = array
    error.status = statusCode
    throw error
  }
}

module.exports = {
  throwErrorArray
}
