const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
      const blogs = await Blog.find({})
      response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes:request.body.likes? request.body.likes : 0,
    user: user.id
    })

  if (request.body.title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    } else if (request.body.url === undefined) {
      return response.status(400).json({ error: 'url missing' })}
    else {

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
    }
})

blogsRouter.put('/:id', (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => { 
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})




module.exports = blogsRouter