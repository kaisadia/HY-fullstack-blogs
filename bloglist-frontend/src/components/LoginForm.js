import React from 'react';
import loginService from '../services/login'
import blogService from '../services/blogs';


function LoginForm({user, setUser, username, password, setUsername, setPassword, setError}) {

const handleLogin = async (event) => {
    event.preventDefault();
try {
    const user = await loginService.login({username, password})
    blogService.setToken(user.token)
    setUser(user);
    setUsername('');
    setPassword('')
    setError(null)
} catch (exception) {
    setError('Wrong credentials')
    setTimeout(() => {
        setError(null)
      }, 4000)
}
}

if (user === null) 
return (
<div>
<h3>Please login</h3>
<form onSubmit={handleLogin}>
    <div> Username  
    <input 
    type="text" 
    value={username} 
    name="username"
    onChange={(e) => {setUsername(e.target.value); console.log(e.target.value)}}/>
  </div>
  <div> Password 
    <input 
    type="text" 
    value={password} 
    name="password"
    onChange={(e) => {setPassword(e.target.value); console.log(e.target.value)}}/>
  </div>
  <button type="submit">Login</button>
</form>
</div>
)
}


export default LoginForm;