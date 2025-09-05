import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import axios from "axios";

export const SearchBar = () => {
  const { search, setSearch, backendUrl, searchFilteredProducts, setSearchFilterProducts } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  // Fetch products when search changes
  const fetchSearchProducts = async () => {
    try {
      if (!search || search.trim() === "") {
        setSearchFilterProducts([]);
        return;
      }
      const response = await axios.post(`${backendUrl}/api/product/searchProduct`, { search });
      setSearchFilterProducts(response.data.products || []);

       
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // const debounceTimer = setTimeout(() => {
      fetchSearchProducts();
     // }, 500); // debounce to avoid spamming API

    // return () => clearTimeout(debounceTimer);
  }, [search]);

  return (
    <div className="relative flex border-t border-b w-[48%] bg-gray-50 text-center md:w-40 lg:w-96 rounded-md">
      <div className="inline-flex items-center justify-center border border-gray-500 px-5 h-12 rounded-md w-full">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none lg:w-80 w-full py-2 bg-amber-30 text-gray-950  text-xl rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-6 cursor-pointer " src={assets.searchicon} alt="search" />
      </div>

      
    </div>
  );
};
