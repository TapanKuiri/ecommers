import React, { useContext, useState, useEffect } from 'react'
// import { products } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { ProductRelatedProduct } from '../components/product/ProductRelatedProduct';
import { ProductItem } from '../components/ProductItem';
export const HandMade = () => {
  const {products} =  useContext(ShopContext);
  const [myProducts, setMyProducts] = useState(products);
  

  function filterHandMadeProducts (){
    const filteredProducts = products.filter(product => product.category === 'Hand Made');
    setMyProducts(filteredProducts);
  }

  useEffect(()=>{
    if(products.length > 0){
      filterHandMadeProducts();

    }
  }, [products]);

  
  // console.log(myProducts);

  return (
    <div className='container mx-auto px-2 py-8'>
       <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          myProducts.map((product, index)=>{
            return (
              <ProductItem
                 key={index}
                 name={product.name}
                 id ={product._id}
                 price={product.price}  
                  finalPrice={product.finalPrice}
                  image={product.image}
                  category={product.category}
               />
             )
          })
        }
       </div>

       
    </div>
  )
}
