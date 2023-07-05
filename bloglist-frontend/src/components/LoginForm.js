import React from 'react';
import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

function LoginForm({ user, setUser, setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password }); //kirjaudutaan käyttäjänimellä ja salasanalla
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)); //käyttäjätiedot local storageen muistiin
      blogService.setToken(user.token); //token käyttäjälle
      setUser(user);
      setUsername('');
      setPassword('');
      setError(null);
    } catch (exception) {
      setError('Wrong credentials');
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  if (user === null)
    return (
      <div>
        <h3>Please login</h3>
        <form onSubmit={handleLogin}>
          <div>
            {' '}
            Username
            <input
              id="username"
              type="text"
              value={username}
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <div>
            {' '}
            Password
            <input
              id="password"
              type="text"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <button id="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    );
}

export default LoginForm;
