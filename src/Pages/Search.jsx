import React, { useEffect } from 'react';
import Header from "../Components/Header";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieData } from "../Features/DataSlice";
import { motion } from 'framer-motion';
import { FaImdb, FaPlayCircle } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';

const Search = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.movieData.search);
    const searchData = useSelector((state) => state.movieData.list);
    const status = useSelector((state) => state.movieData.status);
    const {id} = useParams() ;
    useEffect(() => {
        if (searchQuery) {
            dispatch(fetchMovieData(searchQuery));
        }
    }, [dispatch, searchQuery]);

   
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className='min-h-screen bg-gray-900'>
            <Header />
            
            <main className='pt-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto'>
                
                <div className='mb-8'>
                    <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
                        {searchQuery ? `Results for "${searchQuery}"` : 'Search Movies'}
                    </h1>
                    <div className='w-16 h-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-full'></div>
                </div>

                {status === 'pending' && (
                    <div className='flex flex-col items-center justify-center py-20'>
                        <div className='w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4'></div>
                        <p className='text-gray-300'>Loading movies...</p>
                    </div>
                )}

                
                {status === 'succeeded' && searchData.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-20 text-center'>
                        <FaPlayCircle className='text-6xl text-gray-600 mb-4' />
                        <h3 className='text-2xl text-white font-medium mb-2'>No movies found</h3>
                        <p className='text-gray-400 max-w-md'>
                            Try searching for something else or check your spelling.
                        </p>
                    </div>
                )}

                {status === 'succeeded' && searchData.length > 0 && (
                    <motion.div
                        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {searchData.map((movie) => (
                            <NavLink to={`/playmovie/${movie.imdbID}`}>

                            <motion.div
                                key={movie.imdbID}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className='group cursor-pointer'
                                >
                                <div className='relative overflow-hidden rounded-lg shadow-lg bg-gray-800 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-red-500/20'>
                                    <div className='aspect-[2/3] relative'>
                                        <img 
                                            src={movie.Poster || 'https://via.placeholder.com/300x450?text=No+Poster'} 
                                            alt={movie.Title}
                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                            />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                                            <button className='w-full py-2 bg-red-600 text-white rounded-md font-medium flex items-center justify-center space-x-2'>
                                                <FaPlayCircle />
                                                <span>Watch</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className='p-4'>
                                        <h3 className='text-white font-semibold line-clamp-1'>{movie.Title}</h3>
                                        <div className='flex justify-between items-center mt-2'>
                                            <span className='text-gray-400 text-sm'>{movie.Year}</span>
                                            <div className='flex items-center space-x-1 bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold'>
                                                <FaImdb />
                                                <span>IMDb</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </NavLink>
                        ))}
                    </motion.div>
                )}
            </main>

            <footer className='py-8 mt-12 border-t border-gray-800'>
                <div className='max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center'>
                    <p className='text-gray-400'>
                        © {new Date().getFullYear()} Movie Search App. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Search;