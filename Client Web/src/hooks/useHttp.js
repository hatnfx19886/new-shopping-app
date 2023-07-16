import { useState } from 'react';
import { useCookies } from 'react-cookie';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [cookies] = useCookies();

  const sendRequest = async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000${requestConfig.url}`, {
        method: requestConfig.method || 'GET',
        headers: {
          ...requestConfig.headers,
          Authorization: 'Bearer ' + cookies.token,
        },
        body: JSON.stringify(requestConfig.body) || null,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      } else applyData(data);
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? "Can't connect to server!"
          : err.message
      );
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
