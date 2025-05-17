import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import HeroSection from "../Components/HeroSection";
const Home = () => {
  return (
    <div className='overflow-x-hidden'>   
      <Header/>
      <HeroSection/>
      <Footer/>
    </div>
  )
}

export default Home
