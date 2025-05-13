'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/vercel.svg"
            alt="Logo"
            width={100}
            height={24}
            className="dark:invert"
          />
        </Link>
        <nav>
          <Link 
            href="/peliculas" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Películas
          </Link>
        </nav>
      </div>
    </header>
  );
}