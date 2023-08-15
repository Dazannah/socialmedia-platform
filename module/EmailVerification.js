require("dotenv/config")
const { DatabaseSave } = require("./Database")
const ElasticEmail = require("@elasticemail/elasticemail-client")

const client = ElasticEmail.ApiClient.instance
const apikey = client.authentications["apikey"]
apikey.apiKey = process.env.EMAILAPIKEY
const emailsApi = new ElasticEmail.EmailsApi()

class VerificationEmail {
  constructor(email, username, userId) {
    this.email = email
    this.username = username
    this.userId = userId
    this.error = []
  }

  async createVerifyId() {
    const databaseSave = new DatabaseSave("emailVerification", { username: this.username })
    this.verifyId = await databaseSave.saveOne()
  }

  generateEmail() {
    this.emailData = {
      Recipients: {
        To: [this.email]
      },
      Content: {
        Body: [
          {
            ContentType: "HTML",
            Charset: "utf-8",
            Content: `Your verification link is: <a href="https://socialmedia.davidfabian.hu/verification/${this.verifyId.insertedId.toString()}">Click here to verify your new account.</a>`
          }
        ],
        From: "verification@davidfabian.hu",
        Subject: "E-mail verification"
      }
    }
  }

  async sendEmail() {
    const callback = (error, data, response) => {
      if (error) {
        console.log(response)
      }
    }

    emailsApi.emailsTransactionalPost(this.emailData, callback)
  }
}

module.exports = VerificationEmail
