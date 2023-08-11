import axios from "axios";

import { memoizedRefreshToken } from "./refreshToken";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}/user`;

axios.interceptors.request.use(
  async (config) => {
    const session = JSON.parse(localStorage.getItem("session"));
    console.log('reuqest calisti')
    if (session?.['x-access-token']) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.['x-access-token']}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    console.log(error)
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.['x-access-token']) {
          console.log(result)
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result?.['x-access-token']}`,
        };

        // Güncellenmiş token bilgisini localStorage'a kaydetme
        const session = JSON.parse(localStorage.getItem("session"));
        session['x-access-token'] = result['x-access-token'];
        localStorage.setItem('session', JSON.stringify(session));
      }

      console.log(config.headers);
      console.log(axios(config));
      console.log(error);

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
