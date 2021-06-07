import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const NavBar = ({ logoutHandler }) => {
  const location = useLocation();
  let regex = new RegExp("^/$");

  return (
    <nav className="fixed top-0 left-0 right-0 p-1 bg-indigo-300 flex justify-between">
      <div>
        <Link to="/">
          {regex.test(location.pathname) ? (
            <h1 className="text-xl font-bold">Hello Demo Album</h1>
          ) : (
            <h1 className="text-xl font-bold text-yellow-600">Go Back!</h1>
          )}
        </Link>
      </div>
      <div></div>
      <div>
        <button
          className="rounded-sm bg-gray-500 px-3 text-white font-semibold"
          onClick={() => logoutHandler()}
        >
          logout
        </button>
        <Link to="/upload">
          <button className="ml-1 rounded-sm bg-gray-500 px-3 text-white font-semibold">
            upload
          </button>
        </Link>
      </div>
    </nav>
  );
};
