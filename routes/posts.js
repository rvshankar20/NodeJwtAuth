const router = require("express").Router()
const verify = require("../VerifyToken")
const Post = require("../models/Post")

//Get All posts
router.get("/", verify, async (req, res) => {
  const posts = await Post.find()
  res.json(posts)
})

//Get Specific post
router.get("/:postId", verify, async (req, res) => {
  const posts = await Post.findById(req.params.postId)
  res.json(posts)
})

//Create Post
router.post("/create", verify, async (req, res) => {
  const post = new Post({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
  })
  const postSaved = await post.save()
  console.log(postSaved)
  res.json(postSaved)
})

//Delete Post
router.delete("/:postId", verify, async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.postId })
    res.json(deletedPost)
  } catch (err) {
    res.json({ messsage: err })
  }
})

//Patch Post
router.patch("/:postId", verify, async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { title: req.body.title }
    )
    res.json(updatedPost)
  } catch (err) {
    res.json({ messsage: err })
  }
})

//PUt Post
router.put("/:postId", verify, async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { title: req.body.title }
    )
    res.json(updatedPost)
  } catch (err) {
    res.json({ messsage: err })
  }
})

module.exports = router
