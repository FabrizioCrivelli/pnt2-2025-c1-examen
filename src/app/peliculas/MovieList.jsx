import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 20; 

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://mflixbackend.azurewebsites.net/api/movies?pageSize=${pageSize}&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error encontrando las películas:', error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="text-center p-4">No hay películas disponibles</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="py-2">Página {currentPage}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
