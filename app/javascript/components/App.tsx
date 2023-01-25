import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './index/Home';
import Post from './show/Post';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Popup from './Popup';
import { AuthContext } from './AuthContext';
import { axiosInstance } from './api';
import NewPost from './create/PostForm';

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

const App: React.FC = () => {
  const auth = useContext(AuthContext);

  //Add interceptor to handle unauthorised error by opening login prompt
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (rsp) => rsp,
      (error) => {
        if (error.response.status === 401) {
          auth.setLoginPrompted(true);
        }
      }
    );
  }, []);

  return (
    <>
      {auth.loginPrompted && <Popup />}
      <Wrapper>
        <Navbar />
        <PageWrapper>
          <Sidebar />
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/create" element={<NewPost />} />
            </Routes>
          </ContentWrapper>
        </PageWrapper>
      </Wrapper>
    </>
  );
};

export default App;
