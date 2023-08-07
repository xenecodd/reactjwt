import "../styles.css";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import { columns } from "../Columns";

function Userlist() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data);
  const users = useSelector((state) => state.data.users);

  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (active) {
      dispatch(fetchUsers());
    }
  }, [active, dispatch]);

  return (
    <div className="container mt-5">
      <h1>List of Registered Users</h1>
      <h3>{loading.loading}</h3>
      <button onClick={toggleActive}>fetch users</button>
      {active && (
        <DataTable columns={columns} data={users}>
        </DataTable>
      )}
      <Link to="/">
        <button>Main Page</button>
      </Link>
    </div>
  );
}

export default Userlist;
