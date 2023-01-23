import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { axiosInstance } from './api';
import { tToken, tUser } from './types';

type tAuthContext = {
    user: tUser | null;
    login: (username: string) => Promise<tUser | null>;
    setAfterLogin: (afterLoginFunctionValue: () => void) => void;
    logout: () => void;
    loginPrompted: boolean;
    setLoginPrompted: React.Dispatch<React.SetStateAction<boolean>>;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthContext = createContext<tAuthContext>({} as tAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [user, setUser] = useState<tUser | null>(null);
  const [loginPrompted, setLoginPrompted] = useState(false);
  const [afterLoginFunction, setAfterLoginFunction] = useState<
        (() => void) | null
          >(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(JSON.parse(token));
      setUser(JSON.parse(token));
    }
  }, []);

  const auth = () => {
    const login = async (username: string) => {
      if (user) {
        //If already logged in, return logged in user; else, try to login
        return user;
      } else {
        //If valid username, post with axios
        const postRsp = await axiosInstance.post('/login', {
          username: username,
        });

        //Set token in localStorage
        const token = postRsp.data.token;
        const decoded: tToken = jwtDecode(token);
        const getRsp = await axiosInstance.get(
          `/users/${decoded.user_id}`
        );

        localStorage.setItem('token', JSON.stringify(getRsp.data.data));

        setUser(getRsp.data.data);

        return user;
      }
    };

    const setAfterLogin = (afterLoginFunctionValue: () => void) => {
      if (!user) {
        setLoginPrompted(true);
      }
      setAfterLoginFunction(afterLoginFunctionValue);
    };

    useEffect(() => {
      if (afterLoginFunction) {
        afterLoginFunction();
        setAfterLoginFunction(null);
      }
    }, [user]);

    const logout = () => {
      localStorage.setItem('token', '');
      setUser(null);
    };

    return {
      user,
      login,
      setAfterLogin,
      logout,
      loginPrompted,
      setLoginPrompted,
    };
  };

  return (
    <AuthContext.Provider value={auth()}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
