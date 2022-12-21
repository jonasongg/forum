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

const ContentWrapper = styled.div`
    display: flex;
    margin: 0px 15% 0px 15%;
    gap: 20px;
    flex-grow: 1;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <Navbar />
      <ContentWrapper>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </ContentWrapper>
    </Wrapper>
  );
};

export default App;
