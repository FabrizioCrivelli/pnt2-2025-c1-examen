import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard({ movie }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [imageError, setImageError] = useState(false);
  const year = movie.year || 'Año no disponible';

  const handleVote = (voteType) => {
    if (userVote === voteType) {
      setUserVote(null);
      if (voteType === 'like') {
        setLikes(prev => prev - 1);
      } else {
        setDislikes(prev => prev - 1);
      }
    } else {
      if (userVote) {
        if (userVote === 'like') {
          setLikes(prev => prev - 1);
        } else {
          setDislikes(prev => prev - 1);
        }
      }
      setUserVote(voteType);
      if (voteType === 'like') {
        setLikes(prev => prev + 1);
      } else {
        setDislikes(prev => prev + 1);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/peliculas/${movie._id}`}>
        <div className="relative h-48">
          <Image
            src={imageError ? '/placeholder-movie.jpg' : (movie.poster || '/placeholder-movie.jpg')}
            alt={movie.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized={true}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{year}</p>
        </div>
      </Link>
      <div className="px-4 pb-4 flex justify-between items-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleVote('like');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded ${
            userVote === 'like' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          👍 {likes}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleVote('dislike');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded ${
            userVote === 'dislike' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          👎 {dislikes}
        </button>
      </div>
    </div>
  );
}