import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { assets } from "../assets/assets";

export const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // console.log(orders);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
 

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-b from-blue-50 to-blue-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-slate-800 drop-shadow-sm">
        Orders
      </h2>

      <div className="space-y-6">
        {[...orders].reverse().map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start 
            border border-gray-200 rounded-2xl p-6 bg-white shadow-md hover:shadow-xl 
            transition duration-300"
          >
            {/* Parcel Icon */}
            <div className="flex items-center justify-center">
              <img
                className="w-14 h-14 object-contain"
                src={assets.parcel}
                alt="parcelIcon"
              />
            </div>

            {/* Items + Address */}
            <div className="text-sm sm:text-base space-y-2">
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-slate-600">
                    {item.name} × {item.quantity}{" "}
                    <span className="italic text-gray-500">{item.size}</span>
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="mt-3 font-semibold text-slate-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-slate-600">{order.address.street}</p>
              <p className="text-slate-600">
                {order.address.city}, {order.address.state},{" "}
                {order.address.country} - {order.address.zipcode}
              </p>
              <p className="text-slate-600">📞 {order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div className="text-sm text-slate-600 space-y-2">
              <p>
                Items:{" "}
                <span className="font-medium">{order.items.length}</span>
              </p>
              <p>
                Method:{" "}
                <span className="font-medium">{order.paymentMethod}</span>
              </p>
              <p>
                Payment:{" "}
                <span
                  className={`font-medium ${
                    order.payment ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.payment ? "Done ✅" : "Pending ⏳"}
                </span>
              </p>
              <p>
                Date:{" "}
                <span className="font-medium">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Amount */}
            <div className="flex items-center text-lg font-semibold text-blue-700">
              {currency}
              {order.amount}
            </div>

            {/* Status Dropdown */}
            <div className={ `flex items-center flex-row md:flex-col lg:flex-col gap-3`}>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                disabled={order.status === "Cancelled"}
                className="p-2 rounded-lg border border-gray-300 shadow-sm font-medium 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                transition"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            <div className={`${order.status === 'Cancelled' ? 'bg-red-400' : 'bg-green-500'} p-3 px-5 border-0 rounded-2xl`}>
              <div className="text-black">
                  {order.status}

              </div>
            </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
