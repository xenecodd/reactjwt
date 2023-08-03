import React, { useState, useEffect } from 'react';
import {
  Link, useHistory, redirect
} from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [active, setActive] = useState(true);


  const handleLogin = (e) => {
    e.preventDefault();
    const baseURL = process.env.REACT_APP_BASE_URL;
    fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'email': email, 'password': password}),
    })
        .then(res => res.json())
        .then(data => {
          window.localStorage.setItem('x-access-token', data['x-access-token']);
          setData(data);
          setIsLoggedIn(true);
          console.log(data['x-access-token'])
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  };

  const handleRegister = (e) => {
    e.preventDefault();
  };

  const toggleForm = () => {
    setShowLoginForm((prev) => !prev);
  };


  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Login Succeed! Welcome Back</h1>
            <Link to="/Userlist" target='_self'>
            <button>Userlist</button>
            </Link>
        </div>
      ) : (
        <div>
          <h2>Login / Register</h2>
          {showLoginForm ? (
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" required />
              <br />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <button type="submit">Register</button>
            </form>
          )}
          <button onClick={toggleForm}>
            {showLoginForm ? 'Register' : 'Login'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
