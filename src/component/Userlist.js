import DataTable from "react-data-table-component";
import React, {useEffect, useState} from "react";
import isLoggedIn from './App.js'

  const token= window.localStorage.getItem('x-access-token')
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
      const [user, setUser] = useState('');
       useEffect(() => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    console.log(token);
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
              </div>
          )

}

export default Userlist;