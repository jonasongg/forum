import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './index/Home';
import Post from './show/Post';
import Navbar from './navigation/Navbar';
import Popup from './popup/Popup';
import { AuthProvider } from './authentication/AuthContext';
import NewPost from './create/PostForm';
import Sidebar from './navigation/Sidebar';
import { PopupProvider } from './popup/PopupContext';

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
  return (
    <PopupProvider>
      <AuthProvider>
        <Popup />
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
      </AuthProvider>
    </PopupProvider>
  );
};

export default App;
