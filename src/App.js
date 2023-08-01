import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Userlist from './component/Userlist';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [active, setActive] = useState('');


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
          setToken(data['x-access-token']);
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
      <Router>
        <div>
          {/* Diğer form kodları */}
          <Routes>
            <Route
                path="/Userlist"
                element={<Userlist userdata={data}/>}
            />
          </Routes>
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
                <br/>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input type="submit" value="Login"/>
              </form>
          ) : (
              <form onSubmit={handleRegister}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" required/>
                <br/>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br/>
                <button type="submit">Register</button>
              </form>
          )}

          {/* Toggle Form Butonu */}
          <button onClick={toggleForm}>
            {showLoginForm ? 'Register' : 'Login'}
          </button>

          {/* Userlist Tablosu */}
          <button onClick={() => setActive(true)}>Show User Table</button>
          <button onClick={() => setActive(false)}>Hide User Table</button>
        </div>
                    <div>
            <Link to="/Userlist" target="_blank">
              <button>Userlist</button>
            </Link>
          </div>
      </Router>
  );
}

export default App;
