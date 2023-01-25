import jwtDecode from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGetUser, apiPostLogin } from '../api';
import { PopupContext } from '../popup/PopupContext';
import { tToken, tUser } from '../types';

type tAuthContext = {
    user: tUser | null;
    login: (username: string) => Promise<tUser | null>;
    promptLogin: (afterLoginValue?: (user: tUser) => void) => void;
    logout: () => void;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthContext = createContext<tAuthContext>({} as tAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [user, setUser] = useState<tUser | null>(null);
  const popup = useContext(PopupContext);

  const setAfterLoginDefault = () =>
    console.log('Default value of afterLogin');
  const [afterLogin, setAfterLogin] = useState<(user: tUser) => void>(
    () => setAfterLoginDefault
  );

  const decodeUser = async (token: string) => {
    const decoded: tToken = jwtDecode(token);
    const getRsp = await apiGetUser(decoded.user_id);

    return getRsp.data.data;
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setUser(await decodeUser(token));
      }
    })();
  }, []);

  //Add interceptor to handle unauthorised error by opening login prompt
  // useEffect(() => {
  //   axiosInstance.interceptors.response.use(
  //     (rsp) => rsp,
  //     (error) => {
  //       if (error.response.status === 401) {
  //         auth.setLoginPrompted(true);
  //       }
  //     }
  //   );
  // }, []);

  const auth = () => {
    const login = async (username: string) => {
      // if (user) {
      //   //If already logged in, return logged in user; else, try to login
      //   return user;
      // } else {

      //If valid username, post with axios and set token in localStorage
      const token = (await apiPostLogin(username)).data.token;
      localStorage.setItem('token', token);

      setUser(await decodeUser(token));

      return user;
      // }
    };

    const promptLogin = (afterLoginValue?: (user: tUser) => void) => {
      if (!user) {
        popup.setPopupPrompted(1);
        if (afterLoginValue) {
          setAfterLogin(() => afterLoginValue);
        }
      } else {
        if (afterLoginValue) {
          afterLoginValue(user);
        }
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
    };
  };

  return (
    <AuthContext.Provider value={auth()}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
