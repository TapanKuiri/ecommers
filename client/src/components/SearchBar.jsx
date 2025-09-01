import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);
  
      // useEffect(()=>{
      //      if(showSearch){
      //         setIsVisible(true);
      //      }else{
      //         setIsVisible(false);
      //      }
      // },[location])


  return (
    <div className='flex border-t border-b w-[48%]  bg-gray-50 text-center md:w-40 lg:w-96 rounded-md'>
      <div className='inline-flex  items-center justify-center border border-gray-500 px-5 h-12 rounded-md'>
        <input
          type='text'
          placeholder='Search'
          className='flex-1 outline-none lg:w-80  w-full  py-2 bg-amber-30 text-gray-950 text-xl rounded-md'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className='w-6 cursor-pointer' src={assets.searchicon} alt='search' />
      </div>
      {/* <img
        src={assets.search_icon}
        alt='close-search'
        className='inline w-4 ml-2 cursor-pointer'
        onClick={() => setShowSearch(false)}
      /> */}
    </div>
  );
};
