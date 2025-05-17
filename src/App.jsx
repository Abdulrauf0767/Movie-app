import React from 'react'
import {Route, Routes  } from "react-router-dom";
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import PlayMovie from './Pages/PlayMovie';
import List from './Pages/List';
const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/movies' element = {<Movies/>} />
        <Route path='/playmovie/:id' element ={<PlayMovie/>} />
        <Route path='/list' element ={<List/>} />
      </Routes>
    </div>
  )
}

export default App
