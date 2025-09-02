import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';

export const Navbar = ({ setToken }) => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/total`);
        if (response.data.success) {
          setTotalUsers(response.data.totalUsers);
        }
      } catch (err) {
        console.error("Error fetching total users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <p>hi</p>
      <div className='bg-green-800 w-20 text-center rounded-2xl text-white'>
        <p>User: {totalUsers}</p>
      </div>
      <button
        onClick={() => setToken('')}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};
