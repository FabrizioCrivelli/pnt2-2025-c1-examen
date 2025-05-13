import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto p-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()}parcial PNT2</p>
      </div>
    </footer>
  );
}