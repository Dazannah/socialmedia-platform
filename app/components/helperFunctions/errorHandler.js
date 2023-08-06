function errorHandler(error) {
  let type = getType(error)
  let value = getValue(error)

  if (value != "" && type != "") {
    return { type, value }
  } else {
    return { type: "", value: "" }
  }
}

function getType(error) {
  let type = ""

  if (error.response) {
    if (error.response.status === 409) type = "warning"
    if (error.response.status === 404) type = "warning"
  } else {
    type = "warning"
  }

  return type
}

function getValue(error) {
  let value = ""

  if (error.response) {
    if (error.response.data) {
      if (Array.isArray(error.response.data)) {
        value = error.response.data
      } else {
        value = [error.response.data]
      }
    } else {
      value = error
    }
  } else {
    value = error
  }

  return value
}

export default errorHandler
