import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export const Add = ({ token }) => {
  const [formData, setFormData] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    name: "",
    description: "",
    price: "",
    discount: "",
    finalPrice: "",
    category: "Electric & Electronic",
    bestseller: false,
  });

  // Calculate final price automatically
  useEffect(() => {
    const actualPrice = parseFloat(formData.price) || 0;
    const discountPercentage = parseFloat(formData.discount) || 0;
    const discountedAmount =
      actualPrice - (actualPrice * discountPercentage) / 100;
    setFormData((prev) => ({
      ...prev,
      finalPrice: discountedAmount.toFixed(2),
    }));
  }, [formData.price, formData.discount]);

  // Handle text, number, select, checkbox inputs
  const onchangeHandler = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file uploads
  const onFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  // Submit form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("finalPrice", formData.finalPrice);
      data.append("category", formData.category);
      data.append("bestseller", formData.bestseller);

      formData.image1 && data.append("image1", formData.image1);
      formData.image2 && data.append("image2", formData.image2);
      formData.image3 && data.append("image3", formData.image3);
      formData.image4 && data.append("image4", formData.image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, data, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setFormData({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          name: "",
          description: "",
          price: "",
          discount: "",
          finalPrice: "",
          category: "Electric & Electronic",
          bestseller: false,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Upload failed!";
      toast.error(msg);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-4 bg-blue-100 p-6 sm:p-10 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ➕ Add New Product
      </h2>

      {/* Upload Images */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-semibold">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {[1, 2, 3, 4].map((num) => {
            const imgField = `image${num}`;
            const file = formData[imgField];
            return (
              <label key={num} htmlFor={imgField} className="cursor-pointer group">
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300 
                    group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300"
                  src={file ? URL.createObjectURL(file) : assets.upload_icon}
                  alt="upload_area"
                />
                <input
                  type="file"
                  id={imgField}
                  hidden
                  onChange={(e) => onFileChange(e, imgField)}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-1 text-gray-700 font-medium">Product Name</p>
        <input
          name="name"
          value={formData.name}
          onChange={onchangeHandler}
          className="w-full max-w-[600px] px-4 py-2 border border-gray-300 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          type="text"
          placeholder="Type product name"
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-1 text-gray-700 font-medium">Product Description</p>
        <textarea
          name="description"
          value={formData.description}
          onChange={onchangeHandler}
          className="w-full max-w-[600px] px-4 py-2 border border-gray-300 rounded-md 
          resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          rows={4}
          placeholder="Write product description"
        />
      </div>

      {/* Category + Price Section */}
      <div className="flex flex-col sm:flex-row gap-6 w-full flex-wrap">
        <div className="w-full max-w-[260px]">
          <p className="mb-1 text-gray-700 font-medium">Category</p>
          <select
            name="category"
            onChange={onchangeHandler}
            value={formData.category}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="Electric & Electronic">Electric & Electronic</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Mobile & Laptop">Mobile & Laptop</option>
            <option value="Hand Made">Refurbished</option>
            {/* <option value="Bag & Luggage">Bag & Luggage</option> */}
            {/* <option value="Fasion">Fasion</option> */}
            {/* <option value="Festive & Gift">Festive & Gift</option> */}
            {/* <option value="Daily Needs">Daily Needs</option> */}
            {/* <option value="Sports">Sports</option> */}
            {/* <option value="Beauty & Health Care">Beauty & Health Care</option> */}
            {/* <option value="Project & Toys">Project & Toys</option> */}
          </select>
        </div>

        <div className="w-full max-w-[160px]">
          <p className="mb-1 text-gray-700 font-medium">Price (₹)</p>
          <input
            name="price"
            onChange={onchangeHandler}
            value={formData.price}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="number"
            placeholder="₹1000"
          />
        </div>

        <div className="w-full max-w-[160px]">
          <p className="mb-1 text-gray-700 font-medium">Discount (%)</p>
          <input
            name="discount"
            onChange={onchangeHandler}
            value={formData.discount}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            type="number"
            placeholder="10"
          />
        </div>

        <div className="w-full max-w-[180px]">
          <p className="mb-1 text-gray-700 font-medium">Final Price</p>
          <input
            value={formData.finalPrice}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 
            rounded-md text-gray-700 cursor-not-allowed"
            type="text"
          />
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <input
          name="bestseller"
          onChange={onchangeHandler}
          checked={formData.bestseller}
          type="checkbox"
          id="bestseller"
          className="accent-blue-600 cursor-pointer w-5 h-5"
        />
        <label htmlFor="bestseller" className="cursor-pointer text-gray-700">
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-10 py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 
        hover:from-purple-600 hover:to-blue-600 text-white font-semibold 
        rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Add Product
      </button>
    </form>
  );
};
