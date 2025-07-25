import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title } from './Title';
import { ProductItem } from './ProductItem';
 

export const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,  setBestSeller] = useState([]);

    // console.log(products);
    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestSeller = true));
        setBestSeller(bestProduct.slice(0, 1));
    },[products]);
    
  return (
    <div className='my-10 mx-4'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae ducimus architecto temporibus repudiandae incidunt doloremque officiis odio fugiat nobis.</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item, index)=>( 
                    <ProductItem key={index} id={item.id} name={item.name} image={item.image} price={item.price}/> 
                ))
            }
        </div>
    </div>
  )
}
