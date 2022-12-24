import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './index/Home';
import Post from './show/Post';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styled from 'styled-components';

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
    <Wrapper>
      <Navbar />
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
  );
};

export default App;
