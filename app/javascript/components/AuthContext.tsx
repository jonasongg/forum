import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { axiosInstance } from './App';
import { tToken, tUser } from './types';

type tAuthContext = {
    user: tUser | null;
    login: (username: string) => Promise<tUser | null>;
    logout: () => void;
};

const AuthContext = createContext<tAuthContext>({} as tAuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<tUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(JSON.parse(token));
      setUser(JSON.parse(token));
    }
  }, []);

  const auth = () => {
    const login = async (username: string) => {
      //If valid username, post with axios
      const postRsp = await axiosInstance.post('/login', {
        username: username,
      });

      //Set token in localStorage
      const token = postRsp.data.token;
      const decoded: tToken = jwtDecode(token);
      const getRsp = await axiosInstance.get(`/users/${decoded.user_id}`);

      localStorage.setItem('token', JSON.stringify(getRsp.data.data));

      setUser(getRsp.data.data);
      return user;
    };

    const logout = () => {
      localStorage.setItem('token', '');

      setUser(null);
    };

    return { user, login, logout };
  };

  return (
    <AuthContext.Provider value={auth()}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
