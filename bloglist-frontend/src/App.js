import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] =useState('')
  const [message, setMessage] =useState(null)
  const [error, setError] =useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

      
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message}/>
      <ErrorNotification error={error}/>
      {!user && <LoginForm user={user} setUser={setUser} username={username} password={password} setUsername={setUsername} setPassword={setPassword} setError={setError} blogs={blogs}/>}
      {user && 
      <BlogForm blogs={blogs} setBlogs={setBlogs} user={user} setMessage={setMessage} setError={setError}/>}
    </div>
    
  )
  
}

export default App