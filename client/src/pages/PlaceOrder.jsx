import React, { useState, useContext } from 'react';
import { Title } from '../components/Title';
import { CartTotal } from '../components/cart/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PlaceOrder  ()  {
  const [method, setMethod] = useState('cod');
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {

    e.preventDefault();
    if(getCartAmount() < 10){
      return;
    }  
    try {
      if (!token) return toast.error("Please login first");

      let orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            orderItems.push({
              ...product,
              quantity: cartItems[itemId]
            });
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        payment: false
      };

      if (method === 'cod') {
        const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: { token }
        });

        if (response.data.success) {
          setCartItems({});
          toast.success("Order placed successfully!");
          navigate('/orders');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Order placement failed.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 mt-11 lg:mt-0 mx-2 sm:pt-14 min-h-[80vh] border-t'
    >
      {/* Left Side - Delivery Info */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <Title text1='DELIVERY' text2='INFORMATION' />

        <div className='flex gap-3'>
          <input
            required
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First name'
          />
          <input
            required
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last name'
          />
        </div>

        <input
          required
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='email'
          placeholder='Email Address'
        />

        <input
          required
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text'
          placeholder='Street'
        />

        <div className='flex gap-3'>
          <input
            required
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='City'
          />
          <input
            required
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='State'
          />
        </div>

        <div className='flex gap-3'>
          <input
            required
            name='zipcode'
            value={formData.zipcode}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            placeholder='Zipcode'
          />
          <input
            required
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Country'
          />
        </div>

        <input
          required
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='number'
          placeholder='Phone Number'
        />
      </div>

      {/* Right Side - Cart Summary & Payment Method */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12 items-center justify-center bg-green-300 p-3 rounded-xl mb-2 flex flex-col'>
          <Title text1='PAYMENT' text2='METHOD' />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'cod' ? 'bg-green-500' : ''
                }`}
              ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className='w-full mt-8 text-center'>
            <button
              type='submit'
              className='bg-black text-white py-3 p-12 border-1 rounded-2xl hover:bg-white hover:text-black  text-sm'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
