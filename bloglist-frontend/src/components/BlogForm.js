import React from 'react';
import { useState } from 'react';
import blogService from '../services/blogs';


const BlogForm = ({blogs, setBlogs, user, setMessage, setError, blogFormRef}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
  
    const addNote = async (event) => {
        event.preventDefault()
        const blogObject = {
          title: title,
          author: author,
          url: url
        }

        try {
          const returnedPost = await blogService.create(blogObject)
          setMessage('Blog post added!')
          setTimeout(() => {
              setMessage(null)
            }, 4000)
          setBlogs(blogs.concat(returnedPost))
          setTitle('')
          setAuthor('')
          setUrl('')
          blogFormRef.current.toggleVisibility()
        } catch (error) {
            setError('Oops, something went wrong')
          setTimeout(() => {
              setError(null)
            }, 4000)
          console.log(error)
        }
      }
    
    

    return (
        <div>
      <form onSubmit={addNote}>
      <div> Blog title 
      <input 
        type="text" 
        value={title} 
        name="title"
        onChange={(e) => {setTitle(e.target.value)}}
      />
      </div>
      <div> Author 
      <input 
        type="text" 
        value={author} 
        name="author"
        onChange={(e) => {setAuthor(e.target.value)}}
      />
      </div>
      <div> Url
      <input 
        type="text" 
        value={url} 
        name="url"
        onChange={(e) => {setUrl(e.target.value)}}
      />
      </div>
      <button type="submit">Add</button>
    </form>  
    </div>
    );
};

export default BlogForm;

