const usersRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const saltRounds = 10;
  const password = request.body.password;

  if (password.length < 3) {
    return response.status(400).json({ error: "Password is too short" });
  }

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: await bcrypt.hash(password, saltRounds),
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
