import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './index/Home';
import Post from './Post';
import Navbar from './Navbar';

//Act as a router
const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
};

export default App;
