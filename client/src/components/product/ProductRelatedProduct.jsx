import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import {Title} from '../Title.jsx';
import { ProductItem } from '../ProductItem.jsx';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useRef } from 'react';
 

export const ProductRelatedProduct = ({ category }) => {
    const { products, backendUrl, page, setPage, setHasMore } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const containerRef = useRef(null);

    const fetchRelatedProducts=async(pageNumber=1)=>{
        try{
             const response = await axios.post(`${backendUrl}/api/product/relatedProducts`, {category, page: pageNumber, limit:20});
              if(response.data.success){
                   setRelatedProducts((prev) => pageNumber === 1 ? response.data.products : [...prev, ...response.data.products]);
                   setHasMore(response.data.hasMore);
             }else{
                console.log("error")
             }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRelatedProducts(page);
    }, [page]);

    const handelInfiniteScroll = async ()=>{
        try{
            // console.log("scorll...", document.documentElement.scrollHeight);
            // console.log("innerHeight...", window.innerHeight);
            // console.log("scroll Top...", document.documentElement.scrollTop);
            // console.log(document.documentElement.scrollHeight-600,"<", window.innerHeight + document.documentElement.scrollTop);

            if(document.documentElement.scrollHeight - 700 < window.innerHeight + document.documentElement.scrollTop){
                setPage((prev) => prev+1);
            }
 
        }catch(err){
            console.log("Scroll error:", err);
        }
    }
    
    
    useEffect(()=>{
        const container = containerRef.current;
        if (!container) return;    
        // console.log("Adding scroll listener");     
    
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => container.removeEventListener("scroll", handelInfiniteScroll);
    },[ ]);

 
    useEffect(() => {
        fetchRelatedProducts();
    }, [ category]);


    return (
        <div  >
          
            <div className="text-center text-3xl py-2">
                 <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            <div  >

                <div  
                ref={containerRef}
                className="overflow-y-auto max-h-[70vh] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
                >

                    {relatedProducts.map((item, index) => (
                        //  key={index} className='text-green-700 cursor-pointer'>
                        <ProductItem   
                        key={item._id}  id={item._id} name={item.name} price={item.price} finalPrice={item.finalPrice} discount={item.discount} image={item.image} />
                        // </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
