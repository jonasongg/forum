import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Post from './Post'

//Act as a router
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App