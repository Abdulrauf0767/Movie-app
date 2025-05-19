import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchMovieData, setSearchQuery } from '../Features/DataSlice';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = (e) => {
       e.preventDefault();
    dispatch(setSearchQuery(localSearchQuery)); 
    navigate('/search');
    };

    return (
        <div className="relative">
            <header className='w-full h-20 flex justify-between items-center bg-[#151b20] z-20 fixed top-0 px-4 md:px-10'>
                <h1 className='text-red-500 font-roboto text-2xl'>Movie App</h1>
                <form onSubmit={handleSearch} className='hidden md:flex w-[30%] h-9 rounded-3xl border border-gray-200 items-center relative'>
                    <input 
                        value={localSearchQuery} 
                        onChange={(e) => setLocalSearchQuery(e.target.value)}
                        type="search" 
                        placeholder='Search here' 
                        className='bg-transparent outline-none border-0 w-full h-full pl-5 text-white' 
                    />
                    <button type="submit" className="absolute right-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
                <nav className='hidden md:block w-[40%]'>
                    <ul className='flex justify-between items-center h-full'>
                        <NavLink to='/' className='text-white font-roboto hover:text-red-500 transition'>Home</NavLink>
                        <NavLink to='/movies' className='text-white font-roboto hover:text-red-500 transition'>Movies</NavLink>
                        <NavLink to='/contact' className='text-white font-roboto hover:text-red-500 transition'>Contact us</NavLink>
                        <NavLink to='/login' className='text-white font-roboto hover:text-red-500 transition'>Login</NavLink>
                        <NavLink to='/signup' className='text-white font-roboto hover:text-red-500 transition'>Signup</NavLink>
                    </ul>
                </nav>
                <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </header>
            {isMenuOpen && (
                <div className="fixed top-20 left-0 w-full bg-[#151b20] md:hidden z-50 py-4 px-6 shadow-lg">
                    <ul className="flex flex-col space-y-4">
                        <NavLink to='/' onClick={() => setIsMenuOpen(false)} className='text-white font-roboto hover:text-red-500 transition'>Home</NavLink>
                        <NavLink to='/movies' onClick={() => setIsMenuOpen(false)} className='text-white font-roboto hover:text-red-500 transition'>Movies</NavLink>
                        <NavLink to='/contact' onClick={() => setIsMenuOpen(false)} className='text-white font-roboto hover:text-red-500 transition'>Contact us</NavLink>
                        <NavLink to='/login' onClick={() => setIsMenuOpen(false)} className='text-white font-roboto hover:text-red-500 transition'>Login</NavLink>
                        <NavLink to='/signup' onClick={() => setIsMenuOpen(false)} className='text-white font-roboto hover:text-red-500 transition'>Signup</NavLink>
                    </ul>
                    <form onSubmit={handleSearch} className='w-full mt-4 h-9 rounded-3xl border border-gray-200 flex items-center relative'>
                        <input 
                            value={localSearchQuery}
                            onChange={(e) => setLocalSearchQuery(e.target.value)}
                            type="search" 
                            placeholder='Search here' 
                            className='bg-transparent outline-none border-0 w-full h-full pl-5 text-white' 
                        />
                        <button type="submit" className="absolute right-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Header;