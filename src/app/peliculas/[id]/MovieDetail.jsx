'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function MovieDetail({ movie }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-96">
            <Image
              src={imageError ? '/placeholder-movie.jpg' : (movie.poster || '/placeholder-movie.jpg')}
              alt={movie.title}
              fill
              className="object-cover"
              onError={setImageError(true)}
              priority={true}
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {movie.title}
            </h1>
            
            {movie.tomatoes && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Ratings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Viewer Rating:</p>
                    <p>{movie.tomatoes.viewer?.rating || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Critic Rating:</p>
                    <p>{movie.tomatoes.critic?.rating || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {movie.fullplot || 'No hay una descripción disponible'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}