async function login(req, res) {
  console.log(req.body)
  res.status(200).json("ok")
}

module.exports = {
  login
}
