import React from 'react';
import { useState } from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

function BlogPost({blog}) {
    const [likes, setLikes] = useState(blog.likes)

const updateLikes = () => {
    const blogObject = {
          likes: likes +1,
        }
    try {
      blogService.update(blog.id, blogObject)
      setLikes(likes +1);
      } catch (error) {
        console.log(error)
      }
    }

const deleteHandler = () => {
    try {
        console.log(`deleted post with id ${blog.id}`)
        blogService.remove(blog.id)
        } catch (error) {
          console.log(error)
        }
      }

    return (
        <div>
        <div key={blog.id}>
        <p>{blog.title}</p>
        <Togglable button1='Show' button2='Hide'>
           <p>URL: {blog.url}</p>
           <p>Likes: {blog.likes} <button onClick={updateLikes}>Like</button></p>
           <p>Author: {blog.author}</p>
           <button onClick={deleteHandler}>Remove</button>
        </Togglable>
        </div>
        </div>
    );
}
export default BlogPost;