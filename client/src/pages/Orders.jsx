import React, { useContext, useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Orders  ()  {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [status, setStatus] = useState('');
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);

  console.log(orderData)

  const loadOrderData = async () => {
    // if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            item.orderId = order._id;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error('Failed to load orders.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching orders');
    }
  };

  useEffect(() => {
    if (token) loadOrderData();
  }, [token,status]);

  const toggleTracking = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId },
        { headers: { token } }
      );

      // console.log("res", res.data.success)

      if (res.data.success) {
        toast.success('Order cancelled successfully');
        loadOrderData(); // Refresh data
      } else {
        toast.error(res.data.message || 'Failed to cancel order');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500 text-green-700';
      case 'Out for delivery':
        return 'bg-blue-500 text-blue-700';
      case 'Packing':
        return 'bg-yellow-400 text-yellow-700';
      case 'Shipped':
        return 'bg-indigo-500 text-indigo-700';
      case 'Cancelled':
        return 'bg-red-400 text-red-700';
      default:
        return 'bg-gray-400 text-gray-700';
    }
  };

  return (
    <div className="border-t pt-16 px-4 sm:px-10 bg-gray-50 min-h-screen">
      <Title text1={'MY'} text2={'ORDERS'} />

      <div className="mt-6">
        {orderData.length === 0 && (
          <p className="text-center text-gray-500 font-medium">No orders placed yet.</p>
        )}

        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 px-4 sm:px-6 border border-gray-200 rounded-xl shadow-md my-4 bg-white transition-transform hover:scale-[1.01]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left: Product Info */}
              <a href={`/product/${item._id}`} className="flex items-start gap-4 text-sm ">
                <img
                  className="w-20 sm:w-24 h-20 object-cover rounded-lg border border-gray-200"
                  src={item?.image?.[0] || 'https://via.placeholder.com/80'}
                  alt={item.name}
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <p className="bg-green-100 px-2 py-1 rounded-md">
                      {currency}
                      {(item.finalPrice + 10).toFixed(2)}
                    </p>
                    {/* <p className="bg-purple-100 px-2 py-1 rounded-md">Qty: {item.quantity}</p> */}
                  </div>
                  <div className="mt-2 text-gray-500 text-sm leading-6">
                    <p>
                      <span className="font-medium text-gray-600">Date:</span>{' '}
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Payment:</span>{' '}
                      {item.paymentMethod}{' '}
                      {/* <span className={item.payment ? 'text-green-600' : 'text-red-500'}>
                        {item.payment ? ' - Paid' : ' - Pending'}
                      </span> */}
                    </p>
                  </div>
                </div>
              </a>

              {/* Right: Status + Actions */}
              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status).split(' ')[0]}`}></div>
                  <p className={`font-medium text-sm md:text-base ${getStatusColor(item.status).split(' ')[1]}`}>
                    {item.status}
                  </p>
                </div>
                    

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTracking(index)}
                    className="border border-blue-400 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm"
                  >
                    {expandedOrderIndex === index ? 'Hide Tracking' : 'Track'}
                  </button>

                   <button
                      onClick={() => cancelOrder(item.orderId)}
                      className="border border-red-400 text-red-500 hover:bg-red-50 px-3 py-1 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                  
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            {expandedOrderIndex === index && (
              <div className="mt-4 pl-4 border-l-4 border-blue-300 text-sm text-gray-700 space-y-1">
                <p>✅ <strong>Book Confirmed</strong></p>
                <p>{['Packing', 'Shipped', 'Out for delivery', 'Delivered'].includes(item.status) ? '✅' : '⏳'} <strong>Accepted</strong></p>
                {/* <p>{['Shipped', 'Out for delivery', 'Delivered'].includes(item.status) ? '✅' : '⏳'} <strong>Shipped</strong></p> */}
                <p>{['Out for delivery', 'Delivered'].includes(item.status) ? '✅' : '⏳'} <strong>Service partner on the way</strong></p>
                <p>{item.status === 'Delivered' ? '✅' : '⏳'} <strong>Service Completed</strong></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
