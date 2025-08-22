import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [category, setCategory] = useState("Electric & Electronic");
  const [bestseller, setBestseller] = useState(false);

  // Auto calculate final price
  useEffect(() => {
    const actualPrice = parseFloat(price) || 0;
    const discountPercentage = parseFloat(discount) || 0;
    const discountedAmount =
      actualPrice - (actualPrice * discountPercentage) / 100;
    setFinalPrice(discountedAmount.toFixed(2));
  }, [price, discount]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("finalPrice", finalPrice);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setFinalPrice("");
        setCategory("Electric & Electronic");
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-4 bg-blue-100 p-6 sm:p-10 rounded-lg shadow-lg transition-all duration-500 ease-in-out"

      // className="flex flex-col w-full items-start gap-6 bg-white p-6 sm:p-10 rounded-2xl shadow-xl transition-all duration-500 ease-in-out border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ➕ Add New Product
      </h2>

      {/* Upload Images */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-semibold">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {[image1, image2, image3, image4].map((img, i) => {
            const setImg = [setImage1, setImage2, setImage3, setImage4][i];
            return (
              <label
                key={i}
                htmlFor={`image${i + 1}`}
                className="cursor-pointer group"
              >
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300 
                  group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300"
                  src={img ? URL.createObjectURL(img) : assets.upload_icon}
                  alt="upload_area"
                />
                <input
                  onChange={(e) => setImg(e.target.files[0])}
                  type="file"
                  id={`image${i + 1}`}
                  hidden
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
          onChange={(e) => setName(e.target.value)}
          value={name}
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
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="Electric & Electronic">Electric & Electronic</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Mobile & Laptop">Mobile & Laptop</option>
            <option value="Hand Made">Hand Made</option>
            <option value="Bag & Luggage">Bag & Luggage</option>
            <option value="Fasion">Fasion</option>
            <option value="Festive & Gift">Festive & Gift</option>
            <option value="Daily Needs">Daily Needs</option>
            <option value="Sports">Sports</option>
            <option value="Beauty & Health Care">Beauty & Health Care</option>
            <option value="Project & Toys">Project & Toys</option>
          </select>
        </div>

        <div className="w-full max-w-[160px]">
          <p className="mb-1 text-gray-700 font-medium">Price (₹)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            type="number"
            placeholder="₹1000"
          />
        </div>

        <div className="w-full max-w-[160px]">
          <p className="mb-1 text-gray-700 font-medium">Discount (%)</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            type="number"
            placeholder="10"
          />
        </div>

        <div className="w-full max-w-[180px]">
          <p className="mb-1 text-gray-700 font-medium">Final Price</p>
          <input
            value={finalPrice}
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
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
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
