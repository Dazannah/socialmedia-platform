function getUsernameRegex(username) {
  return new RegExp(`^${username}$`, "i")
}

module.exports = {
  getUsernameRegex
}
