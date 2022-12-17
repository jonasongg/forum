import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './index/Home'
import Post from './Post'

//Act as a router
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App