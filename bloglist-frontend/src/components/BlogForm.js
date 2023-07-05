import React from 'react';
import blogService from '../services/blogs';

const BlogForm = ({
  blogs,
  setBlogs,
  setMessage,
  setError,
  blogFormRef,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const returnedPost = await blogService.create(blogObject);
      setMessage('Blog post added!');
      setTimeout(() => {
        setMessage(null);
      }, 4000);
      setBlogs([returnedPost, ...blogs]);
      setTitle('');
      setAuthor('');
      setUrl('');
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setError('Oops, something went wrong');
      setTimeout(() => {
        setError(null);
      }, 4000);
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          {' '}
          Blog title
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          {' '}
          Author
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            placeholder="author"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </div>
        <div>
          {' '}
          Url
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            placeholder="url"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <button id="add-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
