function getUsernameRegex(username) {
  return new RegExp(`^${username}$`, "i")
}

function getCaseInsensitiveRegex(username) {
  return new RegExp(`^${username}$`, "i")
}

module.exports = {
  getUsernameRegex,
  getCaseInsensitiveRegex
}
