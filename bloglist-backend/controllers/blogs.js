const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: user._id,
  });

  if (request.body.title === undefined) {
    return response.status(400).json({ error: "title missing" });
  } else if (request.body.url === undefined) {
    return response.status(400).json({ error: "url missing" });
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  }
});

blogsRouter.put("/:id", (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate("user", { username: 1, name: 1, id: 1 })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const id = request.params.id;
  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(decodedToken.id);

  if (user.blogs.toString().includes(blog.id)) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

module.exports = blogsRouter;
