import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from '../components/Title';
import { useNavigate } from 'react-router-dom';

export const Service = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const allImages = [assets.repair1, assets.repair2, assets.repair3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate  = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 2000);
    // return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [productName, setProductName] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error('Please log in to submit a repair request.');
      return;
    }

    if (!productName || !problemDescription) {
      toast.error('Please enter product name and problem description.');
      return;
    }

    try {
      const serviceData = {
        address: formData,
        productName,
        problemDescription,
      };

      const response = await axios.post(`${backendUrl}/api/service/add`, serviceData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success('Repair request submitted successfully!');
        setProductName('');
        setProblemDescription('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          phone: '',
        });

        navigate('/services')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to submit repair request.');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'
    >
      <div className='flex flex-col items-center gap-4 w-full px-4 animate-fade-in-down'>
        {/* Banner with fade animation */}
        <div className='h-90 w-full overflow-hidden rounded-xl shadow-lg transition-all duration-700 relative z-10'>
          <img
            src={allImages[currentIndex]}
            alt='Repair Banner'
            className='w-full h-full object-cover rounded-xl scale-100 hover:scale-105 transition-transform duration-700'
          />
        </div>


        <div className='text-xl sm:text-2xl my-3 text-center animate-fade-in'>
          <Title text1='REPAIR' text2='INFORMATION' />
        </div>

        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          {/* Product Name and Problem */}
          <input
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
            type='text'
            placeholder='Product Name'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <textarea
            required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
            placeholder='Describe the problem'
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
          />

          {/* Address Fields */}
          <div className='flex gap-3'>
            <input
              required
              onChange={onChangeHandler}
              name='firstName'
              value={formData.firstName}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
              type='text'
              placeholder='First name'
            />
            <input
              required
              onChange={onChangeHandler}
              name='lastName'
              value={formData.lastName}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
              type='text'
              placeholder='Last name'
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name='email'
            value={formData.email}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
            type='email'
            placeholder='Email Address'
          />
          <input
            required
            onChange={onChangeHandler}
            name='street'
            value={formData.street}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
            type='text'
            placeholder='Street'
          />

          <div className='flex gap-3'>
            <input
              required
              onChange={onChangeHandler}
              name='city'
              value={formData.city}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
              type='text'
              placeholder='City'
            />
            <input
              required
              onChange={onChangeHandler}
              name='state'
              value={formData.state}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
              type='text'
              placeholder='State'
            />
          </div>

          <div className='flex gap-3'>
            <input
              required
              onChange={onChangeHandler}
              name='zipcode'
              value={formData.zipcode}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
              type='number'
              placeholder='Zipcode'
            />
            <input
              required
              onChange={onChangeHandler}
              name='country'
              value={formData.country}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
              type='text'
              placeholder='Country'
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name='phone'
            value={formData.phone}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all'
            type='number'
            placeholder='Phone Number'
          />
        </div>

        {/* Submit Button */}
        <div className='w-full flex items-center justify-center my-4 animate-pop'>
          <button
            type='submit'
            className='bg-black text-white px-10 py-2 rounded-lg hover:bg-white hover:text-black transition-all hover:shadow-md active:scale-95'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
