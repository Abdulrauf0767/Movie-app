import React, { useEffect, useState } from 'react';
import { fetchMovieData } from "../Features/DataSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const { list: MovieData, status } = useSelector((state) => state.movieData);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        dispatch(fetchMovieData("popular movies"));
    }, [dispatch]);

    const validMovieData = MovieData || [];
    const mobileItemsPerPage = 2;
    const desktopItemsPerPage = 5;
    const itemsPerPage = window.innerWidth < 768 ? mobileItemsPerPage : desktopItemsPerPage;
    const totalPages = Math.ceil(validMovieData.length / itemsPerPage);
    const paginatedMovies = Array.from({ length: totalPages }, (_, i) =>
        validMovieData.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
    );

    useEffect(() => {
        if (totalPages <= 1 || isHovering) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalPages);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalPages, isHovering]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: "easeOut"
            }
        }),
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)",
            transition: { duration: 0.3 }
        }
    };

    const paginationDotVariants = {
        inactive: {
            scale: 1,
            backgroundColor: "#6B7280"
        },
        active: {
            scale: 1.25,
            backgroundColor: "#EF4444",
            transition: { duration: 0.3 }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative bg-black overflow-hidden">
            <div className="relative h-[90vh] w-full">
                <img 
                    src="https://images4.alphacoders.com/133/1336451.jpg" 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    alt="Cinematic background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <motion.div 
                    className="absolute inset-0 flex items-center justify-center px-4 z-10"
                    initial="hidden"
                    animate="visible"
                    variants={titleVariants}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white leading-tight">
                        Unlimited <span className="text-red-500">Movies</span>,<br />
                        TV Shows & More
                    </h1>
                </motion.div>
            </div>

            <div 
                className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="mb-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Popular Right Now
                    </h2>
                    <div className="w-20 h-1 bg-red-500 mx-auto mt-2 rounded-full" />
                </div>

                {status === 'pending' && (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {status === 'rejected' && (
                    <p className="text-center text-red-400">Failed to load movies. Please try again.</p>
                )}

                <AnimatePresence mode="wait">
                    {status === 'succeeded' && (
                        <>
                            {validMovieData.length > 0 ? (
                                <>
                                    <div className="relative">
                                        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 scrollbar-hide">
                                            {validMovieData.map((item, i) => (
                                                <motion.div
                                                    key={item.imdbID}
                                                    className="px-2 flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 snap-center"
                                                    custom={i % itemsPerPage}
                                                    variants={cardVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    whileHover="hover"
                                                >
                                                    <Link to={`/playmovie/${item.imdbID}`}>
                                                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                                                            <div className="relative pt-[150%] overflow-hidden">
                                                                <motion.img
                                                                    src={item.Poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
                                                                    alt={item.Title}
                                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                                    whileHover={{ scale: 1.1 }}
                                                                    transition={{ duration: 0.3 }}
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                                            </div>
                                                            <div className="p-4 flex-grow flex flex-col">
                                                                <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                                                                    {item.Title}
                                                                </h3>
                                                                <p className="text-gray-400 text-sm mt-auto">
                                                                    {item.Year}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-8 gap-2">
                                        {Array.from({ length: totalPages }).map((_, idx) => (
                                            <motion.button
                                                key={idx}
                                                onClick={() => {
                                                    const container = document.querySelector('.scrollbar-hide');
                                                    const cardWidth = container?.scrollWidth / validMovieData.length;
                                                    container?.scrollTo({
                                                        left: idx * itemsPerPage * cardWidth * (window.innerWidth < 768 ? 2 : 1),
                                                        behavior: 'smooth'
                                                    });
                                                    setActiveIndex(idx);
                                                }}
                                                variants={paginationDotVariants}
                                                animate={activeIndex === idx ? "active" : "inactive"}
                                                className="w-3 h-3 rounded-full focus:outline-none"
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-400 py-10">No movies available</p>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HeroSection;