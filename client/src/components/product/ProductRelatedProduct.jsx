import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import {Title} from '../Title.jsx';
import { ProductItem } from '../ProductItem.jsx';
import { Link } from 'react-router-dom'

export const ProductRelatedProduct = ({ catagory, subCatagory }) => {
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            // Clone the array
            let productsCopy = products.slice();
            // Filter by category and sub-category
            // console.log('productsCopy: ', productsCopy);
            productsCopy = productsCopy.filter((item)=> {
                // console.log('item.catagory', item.category, 'catagory', catagory);
                return catagory === item.category

            });

            // productsCopy = productsCopy.filter((item)=> subCatagory === item.subCatagory);
            // console.log('productsCopy', productsCopy); 

            // Take only the first 4 related products
            setRelatedProducts(productsCopy.slice(0, 4)); 
        }
    }, [products, catagory, subCatagory]);

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                 <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {relatedProducts.map((item, index) => (
                    //  key={index} className='text-green-700 cursor-pointer'>
                     <ProductItem   
                       key={item._id}  id={item._id} name={item.name} price={item.price} image={item.image} />
                    // </Link>
                ))}
            </div>
        </div>
    );
};
