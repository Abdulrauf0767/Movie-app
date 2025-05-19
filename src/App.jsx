import React from 'react'
import {Route, Routes  } from "react-router-dom";
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import PlayMovie from './Pages/PlayMovie';
import List from './Pages/List';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ContactPage from './Pages/Contact';
const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/movies' element = {<Movies/>} />
        <Route path='/playmovie/:id' element ={<PlayMovie/>} />
        <Route path='/list' element ={<List/>} />
        <Route path='/search' element ={<Search/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
    </div>
  )
}

export default App
