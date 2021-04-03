const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
})

module.exports = mongoose.model("Post", schema)
