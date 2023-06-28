import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import BlogPost from './components/BlogPost'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] =useState(null)
  const [error, setError] =useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {           //tarkistaa esim. sivua uudelleen ladatessa localstoragesta onko käyttäjä jo kirjautunut 
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()      


  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message}/>
      <ErrorNotification error={error}/>
      {!user && <LoginForm user={user} setUser={setUser} setError={setError} blogs={blogs}/>}
      {user && 
      <div>
      <Logout user={user}/>
      <Togglable user={user} ref={blogFormRef} button1='Create' button2='Cancel'>
        <BlogForm blogs={blogs} setBlogs={setBlogs} user={user} setMessage={setMessage} setError={setError} blogFormRef={blogFormRef}/>
        </Togglable>
        </div>}
        <BlogPost blogs={blogs} user={user}/>
      </div>
    
  )
  
}

export default App