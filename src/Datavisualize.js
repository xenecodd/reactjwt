import DataTable from "react-data-table-component";
import React from "react";

function  Datavisualize( {columns}) {
        const data = JSON.stringify(window.localStorage.getItem('users'));
        console.log(data)
          return(
              <div className='container mt-5'>
                  <h1>table</h1>
                  <DataTable
                      columns={columns} data={data['users']}>
                  </DataTable>
              </div>
          )
    };
export default Datavisualize;