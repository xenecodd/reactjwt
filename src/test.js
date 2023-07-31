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
