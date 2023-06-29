const listHelper = require("../utils/list_helper");

const moreThanOneBlog = [
  {
    _id: "6453a6d0a089e8285db390a2",
    title: "Hello world",
    author: "John Doe",
    url: "www.hello.com",
    likes: 3,
    __v: 0,
  },
  {
    _id: "6453a6e9a089e8285db390a4",
    title: "It's me",
    author: "John Doe",
    url: "www.hi.com",
    likes: 9,
    __v: 0,
  },
  {
    _id: "6453a6d0a089e8285db390a2",
    title: "Hello world",
    author: "Jane Doe",
    url: "www.hello.com",
    likes: 0,
    __v: 0,
  },
];

const oneBlog = [
  {
    _id: "6453a6d0a089e8285db390a2",
    title: "Hello world",
    author: "John Doe",
    url: "www.hello.com",
    likes: 3,
    __v: 0,
  },
];

const noBlogs = [];

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  test("total likes if more than one blog", () => {
    const result = listHelper.totalLikes(moreThanOneBlog);
    expect(result).toBe(12);
  });

  test("total likes if one blog", () => {
    const result = listHelper.totalLikes(oneBlog);
    expect(result).toBe(3);
  });

  test("total likes if no blogs", () => {
    const result = listHelper.totalLikes(noBlogs);
    expect(result).toBe(0);
  });
});

describe("favorite blog", () => {
  test("favorite blog if more than one", () => {
    const result = listHelper.favoriteBlog(moreThanOneBlog);
    expect(result).toBe(9);
  });

  test("favorite blog if one blog", () => {
    const result = listHelper.favoriteBlog(oneBlog);
    expect(result).toBe(3);
  });

  test("favorite blog if no blogs", () => {
    const result = listHelper.favoriteBlog(noBlogs);
    expect(result).toBe(0);
  });
});

describe("Author with most blogs", () => {
  test("most blogs if more than one blog", () => {
    const result = listHelper.mostBlogs(moreThanOneBlog);
    expect(result).toEqual({ author: "John Doe", blogs: 2 });
  });

  test("most blogs if only one blog", () => {
    const result = listHelper.mostBlogs(oneBlog);
    expect(result).toEqual({ author: "John Doe", blogs: 1 });
  });

  test("most blogs if no blogs", () => {
    const result = listHelper.mostBlogs(noBlogs);
    expect(result).toEqual(undefined);
  });
});

describe("Author with most likes", () => {
  test("most likes if more than one blog", () => {
    const result = listHelper.mostLikes(moreThanOneBlog);
    expect(result).toEqual({ author: "John Doe", likes: 12 });
  });

  test("most likes if one blog", () => {
    const result = listHelper.mostLikes(oneBlog);
    expect(result).toEqual({ author: "John Doe", likes: 3 });
  });

  test("most likes if no blogs", () => {
    const result = listHelper.mostLikes(noBlogs);
    expect(result).toEqual(undefined);
  });
});
