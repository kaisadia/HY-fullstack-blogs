import React from 'react';
import Togglable from './Togglable';

function BlogPost({blogs, user}) {
    return (
        <div>
        {blogs
      .filter(blog => blog.user.username === user.username)
      .map(blog => (
        <div key={blog.id}>
        <p>{blog.title}</p>
        <Togglable button1='Show' button2='Hide'>
           <p>URL: {blog.url}</p>
           <p>Likes: {blog.likes}</p>
           <p>Author: {blog.author}</p>
        </Togglable>
        </div>
      ))}
        </div>
    );
}
export default BlogPost;