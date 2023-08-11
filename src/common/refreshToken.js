import mem from "mem";

import { axiosPublic } from "./axiosPublic";


const refreshTokenFn = async () => {
  const session = JSON.parse(localStorage.getItem("session"));
  const response = await axiosPublic.post("/refresh", {
    refreshToken: session['refresh-token'],
  });
  console.log(session)
  console.log(response.data)
  return response.data
};
const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});