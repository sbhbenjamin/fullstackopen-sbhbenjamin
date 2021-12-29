const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

commentRouter.get('/', async (request, response) => {
  const blogs = await Comment.find({}).populate('blog', {
    comments: 1,
    id: 1,
  })
  response.json(blogs.map((blog) => blog.toJSON()))
})

// get by blog id
commentRouter.get('/:id', async (request, response) => {
  const blogs = await Comment.find({ blog: request.body.blog }).populate('blog', {
    comments: 1,
    id: 1,
  })
  response.json(blogs.map((blog) => blog.toJSON()))
})

commentRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (request.body.message === undefined) {
    return response.status(400).end()
  }

  const user = request.user
  const blog = await Blog.findById(request.body.blog)

  const comment = new Comment({
    message: request.body.message,
    blog: request.body.blog,
    user: user._id,
  })
  

  const savedComment = await comment.save()

  const newComments = blog.comments.concat(savedComment)
  await Blog.findOneAndUpdate({ id: blog.id }, { comments: newComments })


  await blog.save()
  response.json(savedComment.toJSON())
})

module.exports = commentRouter