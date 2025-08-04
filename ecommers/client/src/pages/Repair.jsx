import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets'; // Ensure this contains repair1, repair2, repair3
import { toast } from 'react-toastify';
import axios from 'axios';
import  {backendUrl}  from '../App';  


export const Repair = () => {
  const allImages = [assets.repair1, assets.repair2, assets.repair3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productName, setProductName] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const incrementIndex = ()=>{
    setCurrentIndex(prevIndex => (prevIndex + 1) % allImages.length);
  }

  // Optional: Auto slide every 3 seconds
  useEffect(() => {
    setInterval(incrementIndex, 2000);
  },[]);

  const onSubmitHandler = async(e)   =>   {
        e.preventDefault();
       try{
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('problemDescription', problemDescription);
        
        if(token.length === 0){
          toast.error('Please log in to submit a repair request.');
          return;
        }
        if( productName.length > 0 && problemDescription.length > 0){
          const response = await axios.post(
              backendUrl + '/api/repair/add',
               { productName, problemDescription },
               // formData, // Use this if you want to send form data
              { headers: { token } } // ✅ Single config object
          );
        }else{
          toast.error('Please fill all the fields.');
          return;
        }
        toast.success('Repair request submitted successfully!');
        setProductName('');
        setProblemDescription('');
        console.log(response.data);

       }catch(err){

       }
  }


  return (
     <div className='mt-5'>
       <div>
          <img  className='w-full h-96'
         src={allImages[currentIndex]} alt="" /> 
       </div>

       <form onSubmit={onSubmitHandler} className='flex flex-col gap-2 mt-5 bg-gray-400 p-5 items-center rounded-2xl w-full'>
            <input className='  bg-amber-300 md:w-[40%] lg:w-[40%] w-full p-2 border-1  text-2xl'
            onChange={(e)=> setProductName(e.target.value)}
             type="text" placeholder='Name of the Product' />

            <textarea className='  bg-amber-300 md:w-[40%] lg:w-[40%] w-full p-2 border-1 text-2xl'
            onChange={(e)=> setProblemDescription(e.target.value)}
             type="text" placeholder='What is the problem' />
 

              <button
              type='submit'
              className='
                bg-gray-700 text-white 
                hover:bg-white hover:text-black 
                p-2 w-20 rounded-2xl font-extrabold 
                transition-transform duration-150 ease-in-out 
                active:scale-90
              '
            >
              Submit
            </button>


        </form>
       </div>
  );
};
