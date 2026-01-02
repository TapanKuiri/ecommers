import React, { useContext, useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function MyServices  ()  {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [servicesData, setServicesData] = useState([]);
  const [expandedServiceIndex, setExpandedServiceIndex] = useState(null);

  const loadServicesData = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/service/list`,
        {},
        { headers: { token } }
      );
      
      if (response.data.success) {
        setServicesData(response.data.services.reverse());
      } else {
        toast.error('Failed to load services');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching services');
    }
  };

  useEffect(() => {
    if (token) loadServicesData();
  }, [token]);

  const toggleTracking = (index) => {
    setExpandedServiceIndex(expandedServiceIndex === index ? null : index);
  };

  const cancelService = async (serviceId) => {
    // console.log("Cancel Service ID:", serviceId);
    try {
      const res = await axios.post(
        `${backendUrl}/api/service/cancel`,
        { serviceId },
        { headers: { token } }
      );
      // console.log("Cancel Service Response:", res.data.success);
      if (res.data.success) {
        toast.success('Service cancelled successfully');
        loadServicesData();
      } else {
        toast.error(res.data.message || 'Failed to cancel service');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 text-green-700';
      case 'In Progress':
        return 'bg-blue-500 text-blue-700';
      case 'Pending':
        return 'bg-yellow-400 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-400 text-red-700';
      default:
        return 'bg-gray-400 text-gray-700';
    }
  };

  return (
    <div className="border-t pt-16 px-4 sm:px-10 bg-gray-50 min-h-screen">
      <Title text1={'MY'} text2={'SERVICES'} />

      <div className="mt-6">
        {servicesData.length === 0 && (
          <p className="text-center text-gray-500 font-medium">
            No services requested yet.
          </p>
        )}

        {servicesData.map((service, index) => (
          <div
            key={service._id || index}
            className="py-4 px-4 sm:px-6 border border-gray-200 rounded-xl shadow-md my-4 bg-white transition-transform hover:scale-[1.01]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left: Service Info */}
              <div className="flex items-start gap-5 text-sm">
                <img
                  className="w-20 sm:w-24 h-20 object-cover rounded-lg border border-gray-200"
                  src={service?.image }
                  alt={service.productName || 'Service Item'}
                />
                <div>
                  <div className="flex items-center gap-6 mt-1 text-sm  text-gray-600">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {service.productName || 'Unnamed Product'}
                      </p>
                      <p>
                          {service.problemDescription || 'N/A'}
                        </p>

                    </div>
                    <p className="bg-green-100 px-2 py-1 rounded-md">
                      {currency}{service.estimatedCost?.toFixed(2) || '0.00'}
                    </p>
                    
                  </div>
                  <div className="mt-2 text-gray-500 text-sm leading-6">
                    <p>
                      <span className="font-medium text-gray-600">Date:</span>{' '}
                      {new Date(service.date).toLocaleDateString()}
                    </p>
                    
                  </div>
                </div>
              </div>

              {/* Right: Status + Actions */}
              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(service.status).split(' ')[0]}`}
                  ></div>
                  <p
                    className={`font-medium text-sm md:text-base ${getStatusColor(service.status).split(' ')[1]}`}
                  >
                    {service.status}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTracking(index)}
                    className="border border-blue-400 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm"
                  >
                    {expandedServiceIndex === index ? 'Hide Tracking' : 'Track'}
                  </button>

                  <button
                    onClick={() => cancelService(service._id)}
                    className="border border-red-400 text-red-500 hover:bg-red-50 px-3 py-1 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            {expandedServiceIndex === index && (
              <div className="mt-4 pl-4 border-l-4 border-blue-300 text-sm text-gray-700 space-y-1">
                 <p>✅ <strong>Request Submitted</strong></p>
                <p>
                  {["Under Review", "Ready for Pickup", "Delivered"].includes(service.status)
                    ? "✅"
                    : "⏳"}{" "}
                  <strong>Under Review</strong>
                </p>
                <p>
                  {["Ready for Pickup", "Delivered"].includes(service.status)
                    ? "✅"
                    : "⏳"}{" "}
                  <strong>Ready for Consultantion</strong>
                </p>
                <p>
                  {["Delivered"].includes(service.status) ? "✅" : "⏳"}{" "}
                  <strong>Executed</strong>
                </p>
                {/* <p>✅ <strong>Request Submitted</strong></p>
                <p>{['Under Review', 'Deivered','Ready for Pickup'].includes(service.status) ? '✅' : '⏳'} <strong>Under Review</strong></p>
                <p>{['Deivered', 'Ready for Pickup'].includes(service.status) ? '✅' : '⏳'} <strong>Ready for Pickup</strong></p>
                <p>{['Deivered'].includes(service.status) ? '✅': '⏳'} <storng>Deivered</storng></p> */}
                {/* <p>{service.status === 'Completed' ? '✅' : '⏳'} <strong>Delivered</strong></p> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
