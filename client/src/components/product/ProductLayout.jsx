import React,{ useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext'; // adjust the path as needed
import { assets } from '../../assets/assets';
import { ProductImages } from './ProductImages';
import { ProductInfo } from './ProductInfo';
import { ProductRelatedProduct } from './ProductRelatedProduct';
import { backendUrl } from '../../App';
import axios from 'axios'


export const ProductLayout = () => {
  
  const {productId} = useParams();
  // console.log(productId);
  const {products, currency, addToCart, buyHandler} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('');

  // console.log("products: ", products[0].sizes[0]);

  // console.log("size is", size);

  const fetchProductData = async () =>{
    try{
        const response = await axios.post(`${backendUrl}/api/product/single`,{productId});
        if(response.data.success){
           setProductData(response.data.product);
          setImage(response.data.product.image[0]);
        }
    }catch(err){
        console.log(err);
    }
    // products.map((item) => {
    //   if(item._id === productId){
    //     setProductData(item);
    //     // console.log(item).image[0];
    //     setImage(item.image[0]);
    //     // console.log("product: ",item.sizes[0]); // it give null
    //     return null;
    //   }
    // })
  }



  useEffect(()=>{
    fetchProductData();
  },[productId, products]);

  return  productData ? (
  <div>
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>


          {/* product images */}
          <ProductImages productData={productData} image={image} setImage={setImage} />

      {/* product information --------------------------------------*/}
          <ProductInfo setSize={setSize} productData={productData} currency={currency} size={size} addToCart={addToCart} buyHandler={buyHandler}/>
 
        </div>




    </div>


    {/* ----------------------------Description and Review Section------------------------------------------ */}

      


        {/* ----------------------display related products------------------ */}

      <ProductRelatedProduct category={productData.category} />  

    <div>

    </div>    
  </div>
  ) 
  : <div className='opacity-0'></div>
}
