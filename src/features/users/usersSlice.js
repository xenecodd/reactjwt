import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const headers = {
  'Content-Type': 'application/json',
};

const initialState = {
  users: [],
};

axios.interceptors()

export const fetchUsers = createAsyncThunk('users/getUsers', async () => {
  const token = window.localStorage.getItem('x-access-token');
  const postData = { 'x-access-token': token };
  const response = await axios.post(`${baseURL}/user`, postData, { headers });
  return response?.data.users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
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
        state.loading= 'Rejected!';
      });
  },
});

export default userSlice.reducer;
