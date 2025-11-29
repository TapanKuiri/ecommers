import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

export const Services = ({ token }) => {
  const [serviceList, setServiceList] = useState([]);

  const fetchAllServices = async () => {
    console.log("service list response");
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/service/list`,
        {},
        { headers: { token } }
      );


      if (response.data.success) {
        setServiceList(response.data.services);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/service/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllServices();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, [token]);

  // 🎨 Dynamic badge styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "Request Submitted":
        return "bg-blue-100 text-blue-600";
      case "Under Review":
        return "bg-yellow-100 text-yellow-600";
      case "Ready for Pickup":
        return "bg-purple-100 text-purple-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-b from-blue-50 to-blue-300 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-slate-800 drop-shadow-sm">
        Your Repair Requests
      </h2>

      {serviceList.length === 0 ? (
        <p className="text-center text-slate-600 text-lg">
          No service requests found.
        </p>
      ) : (
        <div className="space-y-6">
          {serviceList.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] gap-6 border border-gray-200 rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition duration-300"
            >
              {/* Parcel Icon */}
              <div className="flex items-center justify-center">
                <img
                  className="w-14 h-14 object-contain"
                  src={assets.parcel}
                  alt="parcel icon"
                />
              </div>

              {/* Address + Product Info */}
              <div className="space-y-2 text-sm sm:text-base">
                <p className="font-semibold text-xl text-blue-600">
                  {order.productName}
                </p>
                <p className="text-slate-500 italic">
                  {order.problemDescription}
                </p>
                <hr className="my-2 border-gray-200" />
                <p className="font-semibold text-slate-800">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-slate-600">{order.address.street}</p>
                <p className="text-slate-600">
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="text-slate-600">📞 {order.address.phone}</p>
              </div>

              {/* Status + Date */}
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <p>
                  Status:{" "}
                  <span
                    className={`font-medium px-3 py-1 rounded-lg ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  Date:{" "}
                  <span className="font-medium">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </p>
              </div>

              {/* Status dropdown */}
              <div className="flex items-center">
                <select
                  className="p-2 h-11 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  <option value="Request Submitted">Request Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Ready for Pickup">Ready for Pickup</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
