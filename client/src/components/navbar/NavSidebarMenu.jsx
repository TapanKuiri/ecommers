import React from "react";
import { NavLink } from "react-router-dom";

export const NavSidebarMenu = ({ isVisible, setIsVisible }) => {
  return (
    <div className=" ">
      <div className={`transition-all duration-300 w-full z-5 fixed`}>
        {/* Rounded container */}
        <div className="flex w-full h-10 text-gray-700 shadow-md rounded-lg overflow-hidden bg-gray-50">
          
          {/* HOME */}
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-sm font-medium w-1/4 border-r 
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "bg-gray-50 hover:bg-blue-100"
              }`
            }
            to="/"
          >
            HOME
          </NavLink>

          {/* PRODUCTS */}
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-sm font-medium w-1/4 border-r 
              ${
                isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  : "bg-gray-50 hover:bg-green-100"
              }`
            }
            to="/products"
          >
            PRODUCTS
          </NavLink>

          {/* HANDMADE */}
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-sm font-medium w-1/4 border-r 
              ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                  : "bg-gray-50 hover:bg-pink-100"
              }`
            }
            to="/HandMade"
          >
            HANDMADE
          </NavLink>

          {/* SERVICE */}
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-sm font-medium w-1/4 
              ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-indigo-700 text-white"
                  : "bg-gray-50 hover:bg-purple-100"
              }`
            }
            to="/service"
          >
            SERVICE
          </NavLink>
        </div>
      </div>
    </div>
  );
};
