import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosPrivate } from "../../common/axiosPrivate";
import { useEffect } from "react";

const baseURL = process.env.REACT_APP_BASE_URL;

const initialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const token = JSON.parse(window.localStorage.getItem('session'));
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token['x-access-token']}`,
    },
  };
  console.log(header)
  const response = await axiosPrivate.post(`${baseURL}/user`, null, header);
  console.log(response.config.headers)
  return response?.data.users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.users = [];
        state.loading = 'Pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = 'Done';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users = [];
        state.loading = 'Rejected!';
      });
  },
});

export default userSlice.reducer;
