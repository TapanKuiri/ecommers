import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const NavbarLinks = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <ul className="hidden sm:flex gap-11 text-sm text-gray-700">
        {/* HOME */}
        <NavLink to="/">
          <p
            className={`${
              currentPath === '/' ? 'bg-black text-white rounded-2xl' : 'text-black'
            } p-1 flex flex-col items-center gap-1 font-extrabold`}
          >
            HOME
          </p>
        </NavLink>

        {/* PRODUCTS */}
        <NavLink to="/products">
          <p
            className={`${
              currentPath === '/products' ? 'bg-black text-white rounded-2xl' : 'text-black'
            } p-1 flex flex-col items-center gap-1 font-extrabold`}
          >
            PRODUCTS
          </p>
        </NavLink>

        {/* HANDMADE */}
        <NavLink to="/HandMade">
          <p
            className={`${
              currentPath === '/HandMade' ? 'bg-black text-white rounded-2xl' : 'text-black'
            } p-1 flex flex-col items-center gap-1 font-extrabold`}
          >
            HANDMADE
          </p>
        </NavLink>

        {/* SERVICE */}
        <NavLink to="/service">
          <p
            className={`${
              currentPath === '/service' ? 'bg-black text-white rounded-2xl' : 'text-black'
            } p-1 flex flex-col items-center gap-1 font-extrabold`}
          >
            SERVICE
          </p>
        </NavLink>
      </ul>
    </div>
  );
};
