const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate('comments', {
      message: 1,
      user: 1
    })
  response.json(blog.toJSON())
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  }).populate('comments', {
    message: 1,
    user: 1
  })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (request.body.title === undefined && request.body.url === undefined) {
    return response.status(400).end()
  }

  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
    author: request.body.author,
    user: user._id,
  })

  const savedBlog = await blog.save()
  const newBlogs = user.blogs.concat(savedBlog._id)
  await User.findOneAndUpdate({ id: user.id }, { blogs: newBlogs })
  response.json(savedBlog.toJSON())
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!user) {
      response.status(401).json({ error: 'unauthorized, not logged in' })
    }

    if (blog.user.toString() === user._id.toString()) {
      const removedBlog = await Blog.findByIdAndRemove(request.params.id)
      user.blogs = user.blogs.filter(blog => blog.id !== removedBlog._id)
      response.status(204).end()
    } else {
      response
        .status(401)
        .json({ error: 'unauthorized, not owner of blog post' })
    }
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
