import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import axios from "axios";

export const SearchBar = () => {
  const { search, setSearch, backendUrl } = useContext(ShopContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products when search changes
  const fetchSearchProducts = async () => {
    try {
      if (!search || search.trim() === "") {
        setResults([]);
        return;
      }
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/product/searchProduct`, { search });
      setResults(response.data.products || []);
       
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSearchProducts();
    }, 500); // debounce to avoid spamming API

    return () => clearTimeout(debounceTimer);
  }, [search]);

  return (
    <div className="relative flex border-t border-b w-[48%] bg-gray-50 text-center md:w-40 lg:w-96 rounded-md">
      <div className="inline-flex items-center justify-center border border-gray-500 px-5 h-12 rounded-md w-full">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none lg:w-80 w-full py-2 bg-amber-30 text-gray-950 text-xl rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-6 cursor-pointer" src={assets.searchicon} alt="search" />
      </div>

      {/* Search results dropdown */}
      {search && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-md max-h-64 overflow-y-auto z-50">
          {loading ? (
            <p className="p-2 text-gray-500">Searching...</p>
          ) : results.length > 0 ? (
            results.map((product) => (
              <div
                key={product._id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer text-left"
              >
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};
