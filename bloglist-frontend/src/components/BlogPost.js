import React from 'react';
import { useState } from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

function BlogPost({ blog, setMessage }) {
  const [likes, setLikes] = useState(blog.likes);

  const updateLikes = () => {
    const blogObject = {
      likes: likes + 1,
    };
    try {
      blogService.update(blog.id, blogObject);
      setLikes(likes + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = () => {
    if (window.confirm(`Do you really want to delete "${blog.title}"?`))
      try {
        console.log(`deleted post with id ${blog.id}`);
        blogService.remove(blog.id);
        setMessage(`Deleted "${blog.title}"`);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div key={blog.id} className="blogs">
      <p>{blog.title}</p>
      <Togglable button1="Show" button2="Hide">
        <p>URL: {blog.url}</p>
        <p>
          Likes: {blog.likes} <button onClick={updateLikes}>Like</button>
        </p>
        <p>Author: {blog.author}</p>
        <button onClick={deleteHandler}>Remove</button>
      </Togglable>
    </div>
  );
}
export default BlogPost;
