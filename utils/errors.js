function throwErrorArray(errorData, statusCode) {
  if (errorData.length > 0) {
    const error = new Error()
    error.data = errorData
    error.status = statusCode
    console.log(error)
    throw error
  }
}

module.exports = {
  throwErrorArray
}
