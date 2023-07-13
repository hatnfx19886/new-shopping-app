import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useHttp from '../hooks/useHttp';

const AuthContext = React.createContext({
  isLogedIn: false,
  user: {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLogedIn, setIsLogedIn] = useState();
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { sendRequest } = useHttp();
  // User can change cookie to anything. Check value of cookie to login or clear cookie
  useEffect(() => {
    const requestConfig = {
      url: '/user/check',
    };
    const applyData = (data) => {
      if (data) {
        setIsLogedIn(true);
        setUser(data);
      } else removeCookie('token');
    };
    cookies.token && sendRequest(requestConfig, applyData);
  }, []);

  // When sign in
  const loginHandler = (data) => {
    setIsLogedIn(true);
    setUser(data.user);
    setCookie('token', data.token, { maxAge: 86400 * 7 });
  };
  // When logout
  const logoutHandler = () => {
    setIsLogedIn(false);
    removeCookie('token');
  };
  const auth = {
    isLogedIn,
    user,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
