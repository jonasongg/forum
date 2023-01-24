import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { apiGetUser, apiPostLogin } from './api';
import { tToken, tUser } from './types';

type tAuthContext = {
    user: tUser | null;
    login: (username: string) => Promise<tUser | null>;
    promptLogin: (afterLoginValue: (user: tUser) => void) => void;
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

  const setAfterLoginDefault = () =>
    console.log('Default value of afterLogin');
  const [afterLogin, setAfterLogin] = useState<(user: tUser) => void>(
    () => setAfterLoginDefault
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(JSON.parse(token));
      setUser(JSON.parse(token));
    }
  }, []);

  const auth = () => {
    const login = async (username: string) => {
      // if (user) {
      //   //If already logged in, return logged in user; else, try to login
      //   return user;
      // } else {

      //If valid username, post with axios and set token in localStorage
      const token = (await apiPostLogin(username)).data.token;
      const decoded: tToken = jwtDecode(token);
      const getRsp = await apiGetUser(decoded.user_id);

      localStorage.setItem('token', JSON.stringify(getRsp.data.data));
      setUser(getRsp.data.data);

      return user;
      // }
    };

    const promptLogin = (afterLoginValue: (user: tUser) => void) => {
      if (!user) {
        setLoginPrompted(true);
        setAfterLogin(() => afterLoginValue);
      } else {
        afterLoginValue(user);
        setAfterLogin(() => setAfterLoginDefault);
      }
    };

    useEffect(() => {
      if (user && afterLogin) {
        afterLogin(user);
        setAfterLogin(() => setAfterLoginDefault);
      }
    }, [user]);

    const logout = () => {
      localStorage.setItem('token', '');
      setUser(null);
    };

    return {
      user,
      login,
      promptLogin,
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
