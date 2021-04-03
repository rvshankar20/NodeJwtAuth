const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { registerValidation, loginValidation } = require("../validation")

router.post("/register", async (req, res) => {
  // Validate the req body with Joi schema
  const validation = registerValidation(req.body)
  if (validation.error) return res.status(400).send(validation.error.message)

  // Email Exist Check
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send("Email Already Exists")

  //Hash Pwds
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    const userSaved = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.header(400).send(err)
  }
})

router.post("/login", async (req, res) => {
  // Validate the req body with Joi schema
  const validation = loginValidation(req.body)
  if (validation.error) return res.status(400).send(validation.error.message)

  // CHeck If Email exist in DB
  const user = await User.findOne({ email: req.body.email })
  if (user === null) return res.status(400).send("Email or Password is wrong.")

  // Compare the pwd stored in DB
  var pwdCheck = await bcrypt.compare(req.body.password, user.password)
  if (!pwdCheck) return res.status(400).send("Email or Password is wrong.")

  // Pwd Matches, return token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY)
  res.header({ "auth-token": token }).send(token)
})

module.exports = router
