const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'first blog post',
    author: 'John Doe',
    url: 'www.blog.fi',
    likes: 6
  },
  {
    title: 'last blog post',
    author: 'Jane Doe',
    url: 'www.blog.com',
    likes: 2
  }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

module.exports = {initialBlogs, blogsInDb}