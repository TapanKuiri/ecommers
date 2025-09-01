import React from "react";
import { NavLink } from "react-router-dom";

export const NavSidebarMenu = ({ isVisible, setIsVisible }) => {
  return (
    <div>
      <div
        className={` transition-all duration-300 mt-2`}
      >
        <div className="flex w-full h-12 text-gray-700 shadow-md rounded-md overflow-hidden mt-2">
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-lg font-semibold w-1/4 border-r
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "bg-white hover:bg-blue-100"
              }`
            }
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-lg font-semibold w-1/4 border-r
              ${
                isActive
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  : "bg-white hover:bg-green-100"
              }`
            }
            to="/products"
          >
            PRODUCTS
          </NavLink>
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-lg font-semibold w-1/4 border-r
              ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                  : "bg-white hover:bg-pink-100"
              }`
            }
            to="/HandMade"
          >
            HANDMADE
          </NavLink>
          <NavLink
            onClick={() => setIsVisible(false)}
            className={({ isActive }) =>
              `text-center flex items-center justify-center text-lg font-semibold w-1/4
              ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-indigo-700 text-white"
                  : "bg-white hover:bg-purple-100"
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
