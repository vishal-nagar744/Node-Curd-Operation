// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Mern Curd Application</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome: {user.firstname}</span>
              <button onClick={logout} className="bg-red-500 px-3 py-2 rounded hover:bg-red-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="bg-white text-blue-600 px-3 py-2 rounded mr-2 hover:bg-gray-200">
                Sign Up
              </Link>
              <Link to="/login" className="bg-white text-blue-600 px-3 py-2 rounded hover:bg-gray-200">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
