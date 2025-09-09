import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

export const NavProfile = () => {
  const { token, setToken, setCartItems, profileImage, setProfileImage } = useContext(ShopContext);
   const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    setProfileImage("");
    setToken("");
    setCartItems({});
    navigate("/login");
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    if (!token) {
      navigate("/login");
    } else {
      setDropdownVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Profile Avatar */}
      <div
        onClick={toggleDropdown}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-800 cursor-pointer hover:scale-105 transition duration-300 bg-gray-200 overflow-hidden"
      >
        {profileImage ? (
          profileImage.startsWith('https') ? (
            <img src={profileImage} alt="IMG" className="w-full h-full object-cover"  />
          ):
          <span className="text-lg font-bold text-gray-800">
            {profileImage}
          </span>
        ) : (
          <img src={assets.profile} alt="Profile" className="w-full h-full" />
        )}
      </div>

      {/* Dropdown Menu */}
      {token && dropdownVisible && (
        <div className="absolute right-0 mt-2 w-42 bg-white border border-gray-200 rounded-md shadow-md">
          <div className="flex flex-col gap-2.5 font-semibold py-2 px-2 text-lg text-gray-700">
            <p className="cursor-pointer hover:text-black transition hover:bg-blue-300 rounded-md px-2">
              👤 My Profile
            </p>

            <Link
              to="/orders"
              className="cursor-pointer hover:text-black transition hover:bg-blue-300 rounded-md px-2"
              onClick={() => setDropdownVisible(false)}
            >
              📦 Orders
            </Link>

            <Link
              to="/services"
              className="cursor-pointer hover:text-black transition hover:bg-green-300 rounded-md px-2"
              onClick={() => setDropdownVisible(false)}
            >
              🛠️ Services
            </Link>

            <p
              onClick={logout}
              className="cursor-pointer hover:text-black transition hover:bg-blue-300 rounded-md px-2"
            >
              🚪 Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
