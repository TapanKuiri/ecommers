import React from "react";
import { NavLink } from "react-router-dom";

export const NavSidebarMenu = React.memo( ({ isVisible, setIsVisible }) => {
  console.log("NavSidebarMenu is rendered");

  const links = [
    {path: "/", label: "HOME", end: true},
    {path: '/products', label: "PRODUCTS"},
    {path: '/HandMade', label: "HANDMADE"},
    {path: '/service', label: "SERVICE"}
  ];

  const getNavLinkClass = ({isActive})=>
      ` flex flex-col items-center h-7 w-auto p-3 mx-[3%] justify-center gap-1 font-extrabold ${isActive?
        'bg-black text-white rounded-2xl':'text-black'
      }`
  ;


  return (
    <div>
      <ul className="lg:hidden md:hidden flex flex-row justify-between items-center w-full text-sm text-gray-700 bg-gray-200 py-3">
        {links.map(({path, label, end})=>(
          <NavLink key={label} to={path} end={end} className={getNavLinkClass}>
             {label}
          </NavLink>
        ))}
      </ul>
    </div>

  );
});
