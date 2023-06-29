const _ = require("lodash");

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

const dummy = (blogs) => {
  return blogs.length === 0 ? 1 : 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return Number(blogs.map((blog) => blog.likes));
  } else {
    const likes = blogs.map((blog) => blog.likes);
    return likes.reduce((a, b) => a + b);
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;
  const likes = blogs.map((blog) => blog.likes);
  return Math.max(...likes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  } else {
    const groupedBlogs = _.groupBy(blogs, "author");
    const authorBlogCounts = _.map(groupedBlogs, (blogs, author) => ({
      author,
      blogs: blogs.length,
    }));
    const authorWithMostBlogs = _.maxBy(authorBlogCounts, "blogs");
    return {
      author: authorWithMostBlogs.author,
      blogs: authorWithMostBlogs.blogs,
    };
  }
};

function mostLikes(blogs) {
  if (blogs.length === 0) return undefined;
  const authorLikes = blogs.reduce((acc, blog) => {
    const authorName = blog.author;
    const likes = blog.likes;

    if (authorName in acc) {
      acc[authorName].author++;
      acc[authorName].likes += likes;
    } else {
      acc[authorName] = {
        author: 1,
        likes: likes,
      };
    }
    return acc;
  }, {});

  let mostLikedAuthor = "";
  let mostLikes = 0;

  for (let author in authorLikes) {
    if (authorLikes[author].likes > mostLikes) {
      mostLikes = authorLikes[author].likes;
      mostLikedAuthor = author;
    }
  }

  return { author: mostLikedAuthor, likes: mostLikes };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
