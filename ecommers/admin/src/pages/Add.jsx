import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import  axios  from 'axios';
import { backendUrl } from '../App';
import {toast} from 'react-toastify'


export const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price , setPrice] = useState('');
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  // const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, such as sending the data to a server.
    // For now, we will just log the data to the console.
    try{
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subcategory);
      formData.append('bestseller', bestseller);
      // formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}})
      console.log(response.data);
      if(response.data.success){
        toast.success(response.data.message)
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        // setSizes([]);
      }else{
        toast.error(response.data.message);
      }

    }catch(err){

    }
    
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        
      </div>
      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img className='w-20'  src={image1 ? URL.createObjectURL(image1) : assets.upload_icon  } alt="upload_area" />
          <input onChange={(e)=> setImage1(e.target.files[0])} type="file" id='image1' hidden />
        </label>

        <label htmlFor="image2">
          <img className='w-20'  src={image2 ? URL.createObjectURL(image2) : assets.upload_icon  } alt="upload_area" />
          <input onChange={(e)=> setImage2(e.target.files[0])} type="file" id='image2' hidden />
        </label> 

        <label htmlFor="image3">
          <img className='w-20'  src={image3 ? URL.createObjectURL(image3) : assets.upload_icon  } alt="upload_area" />
          <input onChange={(e)=> setImage3(e.target.files[0])} type="file" id='image3' hidden />
        </label> 
        
        <label htmlFor="image4">
          <img className='w-20'  src={image4 ? URL.createObjectURL(image4) : assets.upload_icon  } alt="upload_area" />
          <input onChange={(e)=> setImage4(e.target.files[0])} type="file" id='image4' hidden />
        </label>
      </div>
       
       <div className='w-full '>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' />
       </div>

        <div className='w-full '>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here' />
       </div>

       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div> 
          <p>Product catagory</p>
          <select onChange={(e)=> setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Electrical & Electronics">Electrical & Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Mobile Accessories">Mobile Accessories</option>
            <option value="Gifts">Gifts</option>
            <option value="Art">Art</option> 
          </select>
        </div>

          <div> 
          <p>Sub catagory</p>
          <select onChange={(e)=> setSubcategory (e.target.value)} className='w-full px-3 py-2'>
            <option value="Electrical & Electronics">Electrical & Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Mobile Accessories">Mobile Accessories</option>
            <option value="Gifts">Gifts</option>
            <option value="Art">Art</option>


          </select>
        </div>

        <div>
          <p className='mb-2'>Product  Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="Numbeer" placeholder='25' />
        </div>
       </div>

       {/* <div>
        <p className='mb-2'> </p>
          <div className='flex gap-3'>
            <div onClick={()=> setSizes(prev => prev.includes('S') ? prev.filter(size => size !== 'S') : [...prev, 'S'])}>
              <p  
               className={ `${sizes.includes('S') ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`} >S</p>
            </div>

            <div onClick={()=> setSizes(prev => prev.includes('M') ? prev.filter(size => size !== 'M') : [...prev, 'M'])}>
              <p className={ `${sizes.includes('M') ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}  >M</p>
            </div>

            <div onClick={()=> setSizes(prev => prev.includes('L') ? prev.filter(size => size !== 'L') : [...prev, 'L'])}>
              <p className={ `${sizes.includes('L') ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}  >L</p>
            </div>      

            <div onClick={()=> setSizes(prev => prev.includes('XL') ? prev.filter(size => size !== 'XL') : [...prev, 'XL'])}>
              <p className={ `${sizes.includes('XL') ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`} >XL</p>
            </div>

            <div onChange={()=> setSizes(prev => prev.includes('XXL') ? prev.filter(size => size !== 'XXL') : [...prev, 'XXL'])}>
              <p className={ `${sizes.includes('XXL') ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}  >XXL</p>
            </div>
          </div>
       </div> */}

       <div className='flex gap-2 mt-2' >
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox"/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
       </div>

       <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}
