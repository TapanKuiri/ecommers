import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";

export const NavbarLinks = React.memo( () => {
  // console.log("NavbarLinks is rendered");

  const links =  [
    { path: "/", label: "HOME", end: true },
    { path: "/refurbisher", label: "REFURBISHER" },
    // { path: "/refurbisher", label: "REFURBISHER"},
    { path: "/service", label: "SERVICE" },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `p-1 flex flex-col items-center gap-1 font-extrabold ${
      isActive ? "bg-black text-white rounded-2xl" : "text-black"
    }`;

  return (
    <div>
      <ul className="hidden sm:flex lg:gap-11 md:gap-4 text-sm text-gray-700">
        {links.map(({ path, label, end }) => (
          <NavLink key={label} to={path} end={end} className={getNavLinkClass}>
            {label}
          </NavLink>
        ))}
      </ul>
    </div>
    
  );
});

// export const NavbarLinks = React.memo(NavbarLinksComponent);
