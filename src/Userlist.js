import DataTable from "react-data-table-component";
import React, {useEffect, useState} from "react";
import isLoggedIn from './App'
import "./styles.css";
import { createSlice, configureStore } from '@reduxjs/toolkit'
import {Link} from "react-router-dom";

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



    ]

function Userlist(){
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})
    function disp(){store.dispatch(incremented())}

const { incremented, decremented } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})

store.subscribe(() => console.log(store.getState()))


      const [user, setUser] = useState('');
       useEffect(() => {
           const token= window.localStorage.getItem('x-access-token')
           console.log(window.localStorage.getItem('x-access-token'))
           console.log('boş')

    const baseURL = process.env.REACT_APP_BASE_URL;
    fetch(`${baseURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'x-access-token': token}),
    })
        .then(res => res.json())
        .then(user => {
          setUser(user['users']);
          console.log(user);
        });
  },[isLoggedIn] );
          return(
              <div className='container mt-5'>
                  <h1>List of Registered Users</h1>
                  <DataTable
                      columns={columns} data={user}>
                  </DataTable>
                  <Link to="/">
                    <button>Main Page</button>
                  </Link>
                  <button onClick={disp}>tıkla artır</button>
              </div>
          )

}

export default Userlist;