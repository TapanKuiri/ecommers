import React from "react";
import { NavLink } from "react-router-dom";

export const NavbarLinks = () => {
  return (
    <div>
      <ul className="hidden sm:flex lg:gap-11 md:gap-4 text-sm text-gray-700">
        {/* HOME */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-1 flex flex-col items-center gap-1 font-extrabold ${
              isActive ? "bg-black text-white rounded-2xl" : "text-black"
            }`
          }
          end
        >
          HOME
        </NavLink>

        {/* PRODUCTS */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `p-1 flex flex-col items-center gap-1 font-extrabold ${
              isActive ? "bg-black text-white rounded-2xl" : "text-black"
            }`
          }
        >
          PRODUCTS
        </NavLink>

        {/* HANDMADE */}
        <NavLink
          to="/HandMade"
          className={({ isActive }) =>
            `p-1 flex flex-col items-center gap-1 font-extrabold ${
              isActive ? "bg-black text-white rounded-2xl" : "text-black"
            }`
          }
        >
          HANDMADE
        </NavLink>

        {/* SERVICE */}
        <NavLink
          to="/service"
          className={({ isActive }) =>
            `p-1 flex flex-col items-center gap-1 font-extrabold ${
              isActive ? "bg-black text-white rounded-2xl" : "text-black"
            }`
          }
        >
          SERVICE
        </NavLink>
      </ul>
    </div>
  );
};
