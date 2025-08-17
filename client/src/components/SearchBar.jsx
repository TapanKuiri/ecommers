import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);
      let location = useLocation();
  
      useEffect(()=>{
           if(location.pathname.includes('products' || 'home') && showSearch){
              setIsVisible(true);
           }else{
              setIsVisible(false);
           }
      },[location])


  return showSearch && isVisible ?(
    <div className='border-t border-b bg-gray-50 text-center py-2'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 h-10 w-70 rounded-md'>
        <input
          type='text'
          placeholder='Search'
          className='flex-1 outline-none bg-inherit text-sm py-1'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className='w-4 cursor-pointer' src={assets.searchicon} alt='search' />
      </div>
      <img
        src={assets.close}
        alt='close-search'
        className='inline w-4 ml-2 cursor-pointer'
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};
