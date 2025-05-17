import React, { useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { fetchMovieData } from '../Features/DataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

const Movies = () => {
    const { list: MoviesData, status } = useSelector((state) => state.movieData);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMovieData());
        }
    }, [dispatch, status]);

    return (
        <div className="bg-[#151b20] min-h-screen">
            <Header />
            <div className="w-[90%] mt-24 md:w-[85%] mx-auto py-10">
                {status === 'pending' && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
                {status === 'rejected' && (
                    <p className="font-roboto text-lg text-white text-center w-full">Failed to load movies data</p>
                )}

                {status === 'succeeded' && MoviesData && MoviesData.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {MoviesData.map((item, index) => (
                            <NavLink to={`/playmovie/${item.imdbID}`} key={index} className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="relative h-80 ">
                                    <img 
                                        src={item.Poster} 
                                        alt={item.Title} 
                                        className="max-w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-bold text-lg mb-1 truncate">{item.Title}</h3>
                                        <div className="flex items-center">
                                            <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded mr-2">
                                                {item.Year || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60">
                                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                                        View Details
                                    </button>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                )}

                {status === 'succeeded' && MoviesData.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-white text-lg font-medium">No movies found</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Movies;