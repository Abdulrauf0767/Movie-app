import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PlayMovie = () => {
  const { id } = useParams();
  const { list: MoviesData } = useSelector((state) => state.movieData);
  const movie = MoviesData.find((item) => item.imdbID === id);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e]">
        <div className="text-center p-8 glassmorphism-effect rounded-xl">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 mb-4">
            Movie Not Found
          </h1>
          <NavLink 
            to="/" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
          >
            Browse Movies
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e] text-white">
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
         
          <div className="w-full lg:w-[70%]">
           
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 opacity-20 group-hover:opacity-30 blur-md transition-all duration-500"></div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-cinematic border border-[#ffffff10]">
                <iframe
                  src={movie.VideoURL}
                  title={movie.Title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
              </div>
            </div>

            
            <div className="mt-6">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">
                {movie.Title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#ffffff15] rounded-full text-sm font-medium backdrop-blur-sm">
                  {movie.Year}
                </span>
                <span className="px-3 py-1 bg-[#ffffff15] rounded-full text-sm font-medium backdrop-blur-sm">
                  {movie.Type}
                </span>
                <span className="px-3 py-1 bg-[#ffffff15] rounded-full text-sm font-medium backdrop-blur-sm">
                  HD
                </span>
                <div className="flex items-center ml-auto">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>4.8</span>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Play
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#ffffff15] rounded-full font-semibold hover:bg-[#ffffff25] backdrop-blur-sm transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Trailer
                </button>
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                {movie.snippet?.description || `Immerse yourself in the world of ${movie.Title}. This cinematic masterpiece delivers breathtaking visuals and an unforgettable story that will keep you on the edge of your seat.`}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <h3 className="text-gray-400 text-sm">Director</h3>
                  <p className="font-medium">Christopher Nolan</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Cast</h3>
                  <p className="font-medium">Leonardo DiCaprio, Tom Hardy</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Genre</h3>
                  <p className="font-medium">Action, Sci-Fi</p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="w-full lg:w-[30%]">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              More to Watch
            </h2>
            <div className="custom-scrollbar max-h-[calc(100vh-150px)] overflow-y-auto pr-3">
              {MoviesData.filter((m) => m.imdbID !== id).map((item, index) => (
                <NavLink 
                  to={`/playmovie/${item.imdbID}`} 
                  key={index} 
                  className="flex gap-3 items-center p-3 rounded-lg hover:bg-[#ffffff10] hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 mb-3 group"
                >
                  <div className="relative flex-shrink-0 w-[120px] h-[70px] rounded-md overflow-hidden">
                    <img
                      src={item.Poster}
                      alt={item.Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-1 left-1 right-1 flex justify-between items-center text-xs">
                      <span className="bg-black/70 px-1 rounded">HD</span>
                      <span className="bg-black/70 px-1 rounded">1h 30m</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate group-hover:text-red-400 transition-colors duration-300">
                      {item.Title}
                    </p>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{item.Year}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1 text-xs">★</span>
                        <span>4.5</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      <style jsx>{`
        .shadow-cinematic {
          box-shadow: 0 10px 30px -10px rgba(239, 68, 68, 0.3);
        }
        .glassmorphism-effect {
          background: rgba(15, 15, 15, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
      `}</style>
    </div>
  );
};

export default PlayMovie;