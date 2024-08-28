import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center font-serif">
        <Link to="/admin" className="text-white text-lg">Home</Link>
      </div>
    </nav>
  );
}

export default Navbar;
