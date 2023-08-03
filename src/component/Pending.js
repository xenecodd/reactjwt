import {Link, Route, Router, Routes} from "react-router-dom";
import Userlist from "../Userlist";
import React from "react";

function Pending(){

    return(
        <div>
            <h1>Succeed</h1>
            <Link to="/Userlist" target='_blank'>
            <button>Userlist</button>
            </Link>
        </div>
    )

}
export default Pending;