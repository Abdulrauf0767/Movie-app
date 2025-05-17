import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            <header className='w-full h-20 flex justify-between items-center bg-[#151b20] z-20 fixed top-0 px-4 md:px-10'>
                <h1 className='text-red-500 font-roboto text-2xl'>Movie App</h1>
                <form className='hidden md:flex w-[30%] h-9 rounded-3xl border border-gray-200 items-center relative'>
                    <input type="search" placeholder='Search here' className='bg-transparent outline-none border-0 w-full h-full pl-5 text-white' />
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 absolute top-2 text-white right-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                </form>
                <nav className='hidden md:block w-[40%]'>
                    <ul className='flex justify-between items-center h-full'>
                        <NavLink to='/' className='text-white font-roboto hover:text-red-500 transition'>Home</NavLink>
                        <NavLink to='/movies' className='text-white font-roboto hover:text-red-500 transition'>Movies</NavLink>
                        <NavLink to='/list' className='text-white font-roboto hover:text-red-500 transition'>List</NavLink>
                        <NavLink to='/contact' className='text-white font-roboto hover:text-red-500 transition'>Contact us</NavLink>
                        <NavLink to='/signup' className='text-white font-roboto hover:text-red-500 transition'>Signup</NavLink>
                    </ul>
                </nav>
                <button className="md:hidden text-white" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </header>
            {isMenuOpen && (
                <div className="fixed top-20 left-0 w-full bg-[#151b20] md:hidden z-50 py-4 px-6 shadow-lg">
                    <ul className="flex flex-col space-y-4">
                        <NavLink to='/' onClick={toggleMenu} className='text-white font-roboto hover:text-red-500 transition'>Home</NavLink>
                        <NavLink to='/movies' onClick={toggleMenu} className='text-white font-roboto hover:text-red-500 transition'>Movies</NavLink>
                        <NavLink to='/list' onClick={toggleMenu} className='text-white font-roboto hover:text-red-500 transition'>List</NavLink>
                        <NavLink to='/contact' onClick={toggleMenu} className='text-white font-roboto hover:text-red-500 transition'>Contact us</NavLink>
                        <NavLink to='/signup' onClick={toggleMenu} className='text-white font-roboto hover:text-red-500 transition'>Signup</NavLink>
                    </ul>
                    <form className='w-full mt-4 h-9 rounded-3xl border border-gray-200 flex items-center relative'>
                        <input type="search" placeholder='Search here' className='bg-transparent outline-none border-0 w-full h-full pl-5 text-white' />
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 absolute top-2 text-white right-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Header;