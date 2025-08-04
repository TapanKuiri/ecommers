import React, { useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import { Title } from './Title';
import { ProductItem } from './ProductItem';
import { useEffect } from 'react';

export const LatestCollection = () => {

    const {products} = useContext(ShopContext); 
    const [latestProducts, setLatestProducts] = useState([]);
    // console.log('latestProducts', latestProducts);

    useEffect(()=>{
        setLatestProducts(products);
    },[products]);


  return (

    <div className='my-10 px-5'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
        </div>
        {/* Rendring rpoducts */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item, index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>




  )
}
