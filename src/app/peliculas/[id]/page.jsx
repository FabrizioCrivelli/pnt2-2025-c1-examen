'use client';

import { useState, useEffect } from "react";
import { use } from 'react';
import MovieDetail from './MovieDetail';

export default function MovieDetailPage({ params }) {
  const unwrappedParams = use(params);
  const movieId = unwrappedParams.id;
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://mflixbackend.azurewebsites.net/api/movies/${movieId}`
        );
        if (!response.ok) throw new Error('Failed to fetch movie');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  }, [movieId]);

  if (loading) return <div className="container mx-auto p-4">Cargando...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  if (!movie) return <div className="container mx-auto p-4">No se encontró la película</div>;

  return <MovieDetail movie={movie} />;
}