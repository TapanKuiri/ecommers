import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

export const NavProfile = () => {
  const { token, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    if (!token) {
      navigate('/login');
    } else {
      setDropdownVisible(prev => !prev);
    }
  };

  // 👇 Hide dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-11" ref={dropdownRef}>
      {/* Profile Icon */}
      <img
        onClick={toggleDropdown}
        className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition duration-300"
        src={assets.profile}
        alt="Profile Icon"
      />

      {/* Dropdown Menu */}
      {token && dropdownVisible && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md">
          <div className="flex flex-col gap-2 py-2 px-4 text-sm text-gray-700">
            <p className="cursor-pointer hover:text-black transition">👤 My Profile</p>

            <NavLink
              to="/orders"
              className="cursor-pointer hover:text-black transition"
              onClick={() => setDropdownVisible(false)}
            >
              📦 Orders
            </NavLink>

            <p
              onClick={logout}
              className="cursor-pointer hover:text-red-600 transition"
            >
              🚪 Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
