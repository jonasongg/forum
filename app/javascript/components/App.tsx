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

const App: React.FC = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        setButtonClicked(false);
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      {buttonClicked && <Popup setButton={setButtonClicked} />}
      <Wrapper>
        <Navbar setButton={setButtonClicked} />
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

export default App;
