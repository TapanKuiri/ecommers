import React from "react";
import { NavLink } from "react-router-dom";

export const NavSidebarMenu = React.memo( ({ isVisible, setIsVisible }) => {
  // console.log("NavSidebarMenu is rendered");

  const links = [
    {path: "/", label: "HOME", end: true},
    {path: '/products', label: "PRODUCTS"},
    {path: '/HandMade', label: "REFURBISHED"},
    {path: '/service', label: "SERVICE"}
  ];

  const getNavLinkClass = ({isActive})=>
      `px-1 bg-bule-400 ${isActive?
        'bg-black text-white rounded-2xl':'text-black'
      }`
  ;


  return (
    <div className="w-full ">
      
      <ul className="lg:hidden md:hidden flex flex-row justify-between items-center w-atuo text-sm text-gray-700 bg-gray-200 py-2 px-2">
        {links.map(({path, label, end})=>(
          <NavLink key={label} to={path} end={end} className={getNavLinkClass}>
             {label}
          </NavLink>
        ))}
      </ul>
    </div>

  );
});
