const router = require('express').Router()
const Blog = require('../../part4/models/blog')
const User = require('../../part4/models/user')

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = router