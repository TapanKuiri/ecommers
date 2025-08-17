import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';

export const Services = ({ token }) => {
  const [serviceList, setServiceList] = useState([]);
 
  const fetchAllServices = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/service/list`,
        {},
        { headers: { token } }
      );
 
      if (response.data.success) {
        setServiceList(response.data.service);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const statusHandler = async (event, orderId)=>{
    try{
      const response = await axios.post(`${backendUrl}/api/service/status`, {orderId, status:event.target.value}, {headers: {token}});
      if(response.data.success){
        await fetchAllServices();
      }
    }catch(err){
      console.error(err);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchAllServices();
  }, [token]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Repair Requests</h2>

      {serviceList.length === 0 ? (
        <p className="text-center text-gray-600">No service requests found.</p>
      ) : (
        serviceList.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 border border-gray-300 rounded-xl p-3 sm:p-6 my-2 bg-blue-300 shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Parcel Icon */}
            <img className="w-12 h-12 object-contain  " src={assets.parcel} alt="parcel icon" />

            {/* Address + Product Info */}
            <div className="space-y-1 text-sm sm:text-base">
              <p className="font-semibold text-lg text-gray-800">
                {order.productName}
              </p>
              <p className="text-gray-600 italic">{order.problemDescription}</p>
              <hr className="my-2" />
              <p className="font-semibold">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
              </p>
              <p>Phone: {order.address.phone}</p>
            </div>

            {/* Status + Date */}
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p>Status: <span className="font-medium text-blue-700">{order.status}</span></p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Optional: Status dropdown for admin control */}
            {
            <select
              className="p-2 h-10 rounded border"
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
            >
              <option value="Request Submitted">Request Submitted</option>
              <option value="Under Review">Under Review</option>
               <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Delivered">Delivered</option>
            </select>
            }
          </div>
        ))
      )}
    </div>
  );
};
