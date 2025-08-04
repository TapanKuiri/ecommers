import React from 'react'
import { currency } from '../App';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
  
export const List = ({token}) => {
  const [list, setList] = useState([]);
  // console.log(backendUrl+'/api/product/list')
  const fetchList = async()=>{
    try{
      const response = await axios.get(backendUrl + '/api/product/list', {headers: {token}});
      // console.log(list);
      if(response.data.success){
        setList(response.data.products);
      }else{
        toast.error(response.data.message);
      }
    }catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  const removeProduct = async (id) =>{
      try{
        const response = await axios.post(backendUrl+ '/api/product/remove',  {id}, {headers: {token}} );
        if(response.data.success){
          toast.success(response.data.message);
          await fetchList();
        }else{
          toast.error(response.data.message);
        }
        // console.log(response.d ata.success)

      }catch(err){
        console.log(err);
        toast.error(err.message);
      }
  }

  useEffect(()=>{
    fetchList();
  }, []);

  return (
    <div>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* --------list Table  title- --------------------- */}
        <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
        </div>

        {/* -------------product list---------------- */}
            {
              list.map((item, index)=>{
                return (
                 <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
                  key={index}>
                  <img className="w-12" src={item.image[0]} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{currency}{item.price}</p>
                  <p onClick={()=> removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg' >X</p>

                 </div>

                ) 
              })
            }
      </div>
    </div>
  )
}
