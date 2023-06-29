const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/test_helper");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("returns correct amount of blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(Number(helper.initialBlogs.length));
});

test("blog contains id", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body.map((r) => r.id);
  expect(id).toBeDefined();
});

test("blog can be added ", async () => {
  const passwordHash = await bcrypt.hash("password", 10);
  const user = await new User({ username: "Somebody", passwordHash }).save();

  const userToken = { username: "Somebody", id: user.id };
  const token = jwt.sign(userToken, process.env.SECRET);

  const newBlog = {
    title: "an important blog post",
    author: "Jack Smith",
    url: "www.blog.com",
    likes: 4,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const title = response.body.map((r) => r.title);
  expect(title).toContain("an important blog post");
});

test("likes default is zero ", async () => {
  const newBlog = {
    title: "it's me again",
    author: "Laura Smith",
    url: "www.blog.com",
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("blog without title cannot be added", async () => {
  const newBlog = {
    author: "Laura Smith",
    url: "www.blog.com",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const allBlogs = await helper.blogsInDb();

  expect(allBlogs.length).toBe(Number(helper.initialBlogs.length));
});

test("blog without url cannot be added", async () => {
  const newBlog = {
    title: "hello there",
    author: "Laura Smith",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const allBlogs = await helper.blogsInDb();

  expect(allBlogs.length).toBe(Number(helper.initialBlogs.length));
});

test("blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test("blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[0]).not.toEqual(blogsAtStart[0]);
});

afterAll(async () => {
  await mongoose.connection.close();
});
