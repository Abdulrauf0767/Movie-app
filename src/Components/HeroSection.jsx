import React, { useEffect, useState } from 'react';
import { fetchMovieData } from "../Features/DataSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const { list: MovieData, status } = useSelector((state) => state.movieData);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMovieData("popular movies"));
        }
    }, [dispatch, status]);

    const validMovieData = MovieData && MovieData.length > 0 ? MovieData : [];
    const itemsPerPage = 5;
    const totalPages = Math.ceil(validMovieData.length / itemsPerPage);
    const paginatedMovies = Array.from({ length: totalPages }, (_, i) =>
        validMovieData.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    const paginationDotVariants = {
        inactive: {
            scale: 1,
            backgroundColor: "#9CA3AF" 
        },
        active: {
            scale: 1.25,
            backgroundColor: "#EF4444", 
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="overflow-x-hidden pt-20 pb-10 bg-black relative">
            <div className="w-full h-[90vh] md:h-[70vh] relative">
                <img src="https://images4.alphacoders.com/133/1336451.jpg" className="w-full h-full object-cover" alt="movie-background" />
                <div className="absolute inset-0 bg-black/50"></div>
                <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl text-[#c3bcbe] font-bold font-roboto text-center px-4 z-10">
                    Watch your favourite Movies
                </h3>
            </div>

            <div className="mt-10 px-4 md:px-[10%]">
                {status === 'pending' && <p className="text-white text-center">Loading...</p>}
                {status === 'rejected' && <p className="text-white text-center">Error loading movies</p>}
                {status === 'succeeded' && validMovieData.length > 0 && (
                    <>
                        <div className="w-full overflow-x-auto scrollbar-hide">
                            <div className="flex gap-4 w-max">
                                {paginatedMovies[activeIndex].map((item, index) => (
                                    <Link to={`/playmovie/${item.imdbID}`} key={item.imdbID}>
                                        <motion.div
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover="hover"
                                            custom={index}
                                            className="w-[140px] h-[250px] sm:w-[180px] md:w-[230px] md:h-[300px] rounded-lg overflow-hidden bg-white shadow-lg cursor-pointer"
                                        >
                                            <div className="h-[70%] overflow-hidden rounded-lg p-1">
                                                <motion.img 
                                                    src={item.Poster || 'https://via.placeholder.com/300x450?text=No+Poster'} 
                                                    alt={item.Title} 
                                                    className="w-full h-full object-cover rounded-lg"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-bold text-sm sm:text-base truncate">
                                                    {item.Title.length > 30 ? `${item.Title.substring(0, 30)}...` : item.Title}
                                                </h4>
                                                <p className="text-gray-600 text-sm">{item.Year}</p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {totalPages > 1 && (
                            <motion.div 
                                className="flex justify-center mt-6 gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {paginatedMovies.map((_, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={() => {
                                            setActiveIndex(idx);
                                        }}
                                        variants={paginationDotVariants}
                                        animate={activeIndex === idx ? "active" : "inactive"}
                                        className="w-3 h-3 rounded-full"
                                    />
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
                {status === 'succeeded' && validMovieData.length === 0 && (
                    <p className="text-white text-center">No movies found</p>
                )}
            </div>
        </div>
    );
};

export default HeroSection;