import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './index/Home';
import Post from './show/Post';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Popup from './Popup';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PageWrapper = styled.div`
    display: flex;
    margin: 0px 15% 0px 15%;
    gap: 20px;
`;

const ContentWrapper = styled.div`
    width: 70%;
`;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const App: React.FC = () => {
  const [loginPrompted, setLoginPrompted] = useState(false);

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (rsp) => rsp,
      (error) => {
        if (error.response.status === 401) {
          setLoginPrompted(true);
        }
      }
    );

    const close = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        setLoginPrompted(false);
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      {loginPrompted && <Popup setLoginPrompted={setLoginPrompted} />}
      <Wrapper>
        <Navbar setButton={setLoginPrompted} />
        <PageWrapper>
          <Sidebar />
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<Post />} />
            </Routes>
          </ContentWrapper>
        </PageWrapper>
      </Wrapper>
    </>
  );
};

export { axiosInstance };
export default App;
