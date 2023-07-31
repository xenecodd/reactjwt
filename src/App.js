import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DataTable from 'react-data-table-component'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const handleLogin = (e) => {
    e.preventDefault();
    const baseURL = process.env.REACT_APP_BASE_URL;
    fetch(`${baseURL}/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': email,'password': password }),
    })
      .then(res => res.json())
      .then(data => {
        window.localStorage.setItem('x-access-token', data['x-access-token']);
        setData(data);
        setIsLoggedIn(true);
        setToken(data['x-access-token'])
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });}



      useEffect(() => {
          console.log('başladı')
          const baseURL = process.env.REACT_APP_BASE_URL;
          console.log(token)
    fetch(`${baseURL}/user`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'x-access-token':token}),
    }).then(res => res.json())
      .then(data => {
        setData(data['users']);
        window.localStorage.setItem('users', data['users'])
        console.log((JSON.stringify(window.localStorage.getItem('users'))))
          console.log(JSON.stringify(window.localStorage.getItem('users')))
    })
  },[isLoggedIn] );

    const handleRegister = (e) => {
    e.preventDefault();
  };

  const toggleForm = () => {
    setShowLoginForm((prev) => !prev);
  };


      const columns = [

        {
            name: 'email',
            selector: row=> row.email
        },
        {
            name: 'name',
            selector: row=> row.name

        },
        {
            name: 'public_id',
            selector: row=> row.public_id
        }



    ];






  return (
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
            required
          />
          <br />
          <input type="submit" value="Login" />
        </form>
      ) :
          (
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
            required
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
          <input type="submit" value="Register" />
        </form>
      )}

      <button onClick={toggleForm}>
        {showLoginForm ? 'Register' : 'Login'}
      </button>
        <div className='conatiner mt-5'>
            <DataTable
                data={data}
                columns={columns}
            ></DataTable>
        </div>
    </div>
  );
};
export default App;
