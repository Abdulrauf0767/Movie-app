import React from 'react'
import {Route, Routes  } from "react-router-dom";
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import PlayMovie from './Pages/PlayMovie';
import List from './Pages/List';
import Search from './Pages/Search';
const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/movies' element = {<Movies/>} />
        <Route path='/playmovie/:id' element ={<PlayMovie/>} />
        <Route path='/list' element ={<List/>} />
        <Route path='/search' element ={<Search/>} />
      </Routes>
    </div>
  )
}

export default App
