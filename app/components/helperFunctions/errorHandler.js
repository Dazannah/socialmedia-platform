function errorHandler(error) {
  let type = ""
  let value = ""

  if (error.response.status === 409) type = "warning"

  if (error.response.data) value = error.response.data

  if (value != "" && type != "") {
    return { type, value }
  } else {
    return { type: "", value: "" }
  }
}

export default errorHandler
