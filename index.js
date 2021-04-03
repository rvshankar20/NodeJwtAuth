const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

//Parse ENV variables from .env file
dotenv.config()

//Request Body JSON Parser
app.use(express.json())

//Middleware
app.use("/api/users", authRoute)
app.use("/api/posts", postRoute)

//DB Connection
mongoose.connect(
  process.env.DB_CONNECTSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Db Connected")
  }
)

//Listener
app.listen(3000)
