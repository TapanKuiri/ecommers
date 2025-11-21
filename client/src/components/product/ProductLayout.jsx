import React,{ useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext'; // adjust the path as needed
import { assets } from '../../assets/assets';
import { ProductImages } from './ProductImages';
import { ProductInfo } from './ProductInfo';
import { ProductRelatedProduct } from './ProductRelatedProduct';
import { backendUrl } from '../../App';
import axios from 'axios'
import { Loading } from '../loading/Loading';


export default function ProductLayout(){
  
  const {productId} = useParams();

  // console.log(productId);
  const {products, currency, addToCart, buyHandler, productClicked, setProductClicked, clickedProductIDRef} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  // clickedProductIDRef.current = productId;
  const [image, setImage] = useState('')
 

  const fetchProductData = async () =>{
   try{
        const response = await axios.post(`${backendUrl}/api/product/single`,{productId});
        if(response.data.success){ 
          setProductData(response.data.product); 
            setProductClicked(true);
          setImage(response.data.product.image[0]); 
        }
    }catch(err){
        console.log(err);
    }
  }

 
  useEffect(()=>{
     fetchProductData();
  },[ productClicked]);

  return  (productClicked) ? (
  <div>
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>


          {/* product images */}
          <ProductImages productData={productData} image={image} setImage={setImage} />

      {/* product information --------------------------------------*/}
          <ProductInfo    productData={productData} currency={currency}  addToCart={addToCart} buyHandler={buyHandler}/>
 
        </div>

    </div>
        {/* ----------------------display related products------------------ */}

      <ProductRelatedProduct category={productData.category} />  

    <div>

    </div>    
  </div>
  )                         
  : (
   <div className="flex flex-col items-center justify-center mt-12 space-y-6">
  {/* Spinner */}
  <img
    src={assets.spinner}
    alt="Loading..."
    className="w-20 h-20 animate-spin mt-15"
  />

  {/* Animated text SVG */}
  <img
    src={assets.textSvg}
    alt="Loading text"
    className="w-20 h-auto mb-50"
  />
</div>


  
)
}
