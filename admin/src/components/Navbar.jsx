import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';

export const Navbar = ({ setToken }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchTotalProducts = async () =>{
    try{
      const response = await axios.get(`${backendUrl}/api/product/totalProducts`);
      if(response.data.success){
        setTotalProducts(response.data.count);
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTotalProducts();
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
      <div className='flex flex-row w-auto px-2 gap-2 bg-green-800 justify-center text-center rounded-2xl text-white'>
        <p>User: {totalUsers}</p>
        <p>Total Products: {totalProducts}</p>
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
