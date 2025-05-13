'use client';
import { useState, useEffect } from "react";
import MoviesList from './peliculas/MovieList';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pagesize = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://mflixbackend.azurewebsites.net/api/movies?pageSize=${pagesize}&page=${page}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    
  }, page); 

  if (loading) return <div className="container mx-auto p-4">Cargando...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Películas</h1>
      <MoviesList movies={movies} />
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Anterior
        </button>
        <span className="py-2">Página {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
