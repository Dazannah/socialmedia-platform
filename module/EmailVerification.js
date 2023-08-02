require("dotenv/config")
const crypto = require("crypto")

const { MailerSend, Sender, Recipient } = require("mailersend")

class VerificationEmail {
  constructor(email, username) {
    this.email = email
    this.username = username
    this.mailSender = new MailerSend({ apiKey: process.env.EMAILAPIKEY })
    this.recipients = [new Recipient(`${email}`, `${username}`)]
    this.sentFrom = new Sender("socialmediaplatform", "Admin")

    this.error = []
  }

  async generateRandomString() {
    crypto.generateKey("hmac", { length: 48 }, (err, key) => {
      if (err) this.error.push(err)

      this.randomString = key.export().toString("hex")
      console.log(this.randomString)
    })
  }

  async sendEmail() {
    const emailParams = new EmailParams().setFrom(this.sentFrom).setTo(this.recipients).setReplyTo(this.sentFrom).setSubject("E-mail verification").setHtml(`<a href=${this.verificationLink}>Click here to verify the e-mail address.</a>`)

    //await this.mailerSend.email.send(emailParams)
  }
}

module.exports = VerificationEmail
