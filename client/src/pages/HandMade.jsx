import React, { useContext } from 'react'
// import { products } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { ProductRelatedProduct } from '../components/product/ProductRelatedProduct';

export const HandMade = () => {
  const {products} =  useContext(ShopContext);
  const [myProducts, setMyProducts] = React.useState(products);
  // console.log(myProducts);

  return (
    <div>
       <ProductRelatedProduct catagory={'Art'} subCatagory={''}/>
    </div>
  )
}
