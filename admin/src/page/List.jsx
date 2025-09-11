import React, { useState, useEffect } from "react";
import { currency, backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

export const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/product/listAdmin", {
        headers: { token },
      });

      console.log("response", response);
      if (response.data.success) {
        setList(response.data.allProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📦 All Products List
      </h2>

      <div className="flex flex-col gap-3">
        {/* -------- Table Head -------- */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-3 px-4 
        border-b bg-gray-100 text-sm font-semibold text-gray-600 uppercase tracking-wide rounded-t-lg">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* -------- Product Rows -------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center 
            gap-4 py-4 px-4 border bg-white shadow-sm hover:shadow-md transition rounded-lg text-sm"
          >
            {/* Product Image */}
            <img
              className="w-16 h-16 object-cover rounded-lg border"
              src={item.image[0]}
              alt={item.name}
            />

            {/* Name */}
            <p className="font-medium text-gray-800">{item.name}</p>

            {/* Category */}
            <p className="text-gray-600">{item.category}</p>

            {/* Price */}
            <p className="font-semibold text-blue-600">
              {currency}
              {item.price}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 font-bold text-center transition"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
