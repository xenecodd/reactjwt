import React from 'react'
import DataTable from 'react-data-table-component'
function ShowUser(){

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
            selector: row=> row.id
        }



    ]


}