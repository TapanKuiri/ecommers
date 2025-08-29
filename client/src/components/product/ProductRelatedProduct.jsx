import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import {Title} from '../Title.jsx';
import { ProductItem } from '../ProductItem.jsx';
import { Link } from 'react-router-dom'

export const ProductRelatedProduct = ({ category }) => {
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> {
                return category === item.category
            });
            setRelatedProducts(productsCopy.slice(0, 4)); 
        }
    }, [products, category]);

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                 <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {relatedProducts.map((item, index) => (
                    //  key={index} className='text-green-700 cursor-pointer'>
                     <ProductItem   
                       key={item._id}  id={item._id} name={item.name} price={item.price} finalPrice={item.finalPrice} discount={item.discount} image={item.image} />
                    // </Link>
                ))}
            </div>
        </div>
    );
};
