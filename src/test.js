import React, { useState, useEffect } from 'react';

const LoopComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Cleanup function to stop the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [count]); // The useEffect hook will run whenever `count` changes

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};

export default LoopComponent;

/*  try {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            const token = window.localStorage.getItem('refresh-token');
            const postData = { 'refresh-token': token };
            const response = await axios.post(`${baseURL}/refresh`, postData, { headers });
            window.localStorage.setItem('refreshed-data', response.data);
            console.log(response.data);
            return config;
          }

          if (error.response.status === 404) {
            // Do something
            return Promise.reject(error.response.data);
          }
        }
      }
    );*/


/*
  const [response,setResponse]=useState((await axiosPrivate.post(`${baseURL}/user`, null, config)));
  if (response.data===null){setResponse(await axios.post(`${baseURL}/user`, null, response.headers['Authorization']))}
  console.log(response)
 */
