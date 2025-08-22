import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const linkClasses =
    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-slate-300 hover:text-sky-400 hover:bg-slate-700';

  const activeLinkClasses =
    'flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md';

  return (
    <div className="w-full min-h-screen bg-slate-400 shadow-lg">
      <div className="flex flex-col gap-3 pt-6 pl-4 text-[15px] font-medium">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? activeLinkClasses : linkClasses
          }
        >
          <img className="w-5 h-5" src={assets.add} alt="add" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive ? activeLinkClasses : linkClasses
          }
        >
          <img className="w-5 h-5" src={assets.add} alt="list" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? activeLinkClasses : linkClasses
          }
        >
          <img className="w-5 h-5" src={assets.add} alt="orders" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? activeLinkClasses : linkClasses
          }
        >
          <img className="w-5 h-5" src={assets.repair} alt="services" />
          <p className="hidden md:block">Services</p>
        </NavLink>
      </div>
    </div>
  );
};
