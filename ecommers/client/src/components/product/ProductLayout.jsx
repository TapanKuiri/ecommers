import React,{ useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext'; // adjust the path as needed
import { assets } from '../../assets/assets';
import { ProductImages } from './ProductImages';
import { ProductInfo } from './ProductInfo';
import { ProductRelatedProduct } from './ProductRelatedProduct';


export const ProductLayout = () => {
  
  const {productId} = useParams();
  // console.log(productId);
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('');

  // console.log("products: ", products[0].sizes[0]);

  // console.log("size is", size);

  const fetchProductData = async () =>{
    products.map((item) => {
      if(item._id === productId){
        setProductData(item);
        // console.log(item).image[0];
        setImage(item.image[0]);
        // console.log("product: ",item.sizes[0]); // it give null
        return null;
      }
    })
  }


  useEffect(()=>{
    fetchProductData();
  },[productId])

  return  productData ? (
  <div>
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>


          {/* product images */}
          <ProductImages productData={productData} image={image} setImage={setImage} />

      {/* product information --------------------------------------*/}
          <ProductInfo setSize={setSize} productData={productData} currency={currency} size={size} addToCart={addToCart}/>
 
        </div>




    </div>


    {/* ----------------------------Description and Review Section------------------------------------------ */}

        {/* <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam possimus beatae quos facere culpa nobis laboriosam. Veniam, distinctio, est aliquid consequuntur placeat dicta unde voluptates necessitatibus consequatur dolorem accusantium.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nemo ex accusamus fugiat optio iusto excepturi et, sapiente culpa iure voluptatum harum recusandae perspiciatis obcaecati vel, in suscipit eaque quos!</p>

          </div>

        </div> */}



        {/* ----------------------display related products------------------ */}

      <ProductRelatedProduct catagory={productData.catagory} subCatagory={productData.subCatagory} />  

    <div>

    </div>    
  </div>
  ) 
  : <div className='opacity-0'></div>
}
