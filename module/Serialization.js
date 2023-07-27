class Serialization {
  constructor(data) {
    this.data = data
  }
}

class SerializeEmailRegistrationData {
  constructor(username, password, email) {
    this.username = username
    this.password = password
    this.email = email
  }

  prepareDataToSave() {
    return {
      username: this.username,
      password: this.password,
      email: this.email,
      emailValidated: false
    }
  }
}

module.exports = {
  Serialization,
  SerializeEmailRegistrationData
}
