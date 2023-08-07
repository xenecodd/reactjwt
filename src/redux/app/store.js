import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../../features/users/usersSlice'
import usersSlice from "../../features/users/usersSlice";


export const store = configureStore({
  reducer: {
     data: usersReducer
  },
})

export default store