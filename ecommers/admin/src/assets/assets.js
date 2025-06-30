import close from './close.png';
import contact from './contact.png';
import menu from './menu.png';
import quality from './quality.png';
import searchicon from './searchicon.png';
import star from './star.png';
import stripe from './stripe.png';
import search_icon from './search_icon.png'
import support from './support.png';
import telephone from './telephone.png';
import exchange from './exchange.png';
import logo from './logo.png';
import drowdown from './dropdown.png'
import p1 from './p1.jpg';
import p2 from './p2.jpg';
import p3 from './p3.jpg';
import p4 from './p4.jpg';
import table_fan from './table_fan.jpg';
import fan from './fan.png';
// import fan1 from './fan1';
import fan1 from './fan1.jpg'
import watches1 from './watches1.jpg'
import watches from './watches.jpg';
import bin from './bin.png';
// import razory form './razoruypa.png';
import razoruypa from './razorypay.jpeg';
import profile from './profile1.png';
import electronics from './electronics.jpeg';
import upload_icon from './uploadIcon.png';
import parcel from './parcel.png';


export const assets = {
  parcel,
  table_fan,
  electronics,
  profile,
  upload_icon,
    fan1,
    watches,
    search_icon,
    watches1,
    close,
    contact,
    menu,
    logo,
    quality,
    searchicon,
    star,
    stripe,
    exchange,
    support,
    telephone,
    drowdown,
    bin,
    razoruypa,
    // upload_icon,
}

export const products = [
  {
    _id: 'p001',
    name: 'table fan',
    description: 'A comfortable and stylish white t-shirt made from 100% cotton, perfect for casual wear.',
    price: 499,
    image: [table_fan],
    category: 'Men',
    subCategory: 'Topwear',
    size: ['S', 'M', 'L'],
    date: '2023-10-01',
    bestseller: true,
  },{
    _id: 'p002',
    name: 'fan',
    description: 'A comfortable and stylish white t-shirt made from 100% cotton, perfect for casual wear.',
    price: 499,
    image: [fan],
    category: 'Men',
    subCategory: 'Topwear',
    size: ['S', 'M', 'L'],
    date: '2023-10-01',
    bestseller: true,
  },{
    _id: 'p003',
    name: 'wathces',
    description: 'A comfortable and stylish white t-shirt made from 100% cotton, perfect for casual wear.',
    price: 499,
    image: [watches],
    category: 'Men',
    subCategory: 'Topwear',
    size: ['S', 'M', 'L'],
    date: '2023-10-01',
    bestseller: true,
  },{
    _id: 'p004',
    name: 'watches 2',
    description: 'A comfortable and stylish white t-shirt made from 100% cotton, perfect for casual wear.',
    price: 499,
    image: [watches1],
    category: 'Men',
    subCategory: 'Topwear',
    size: ['S', 'M', 'L'],
    date: '2023-10-01',
    bestseller: true,
  },
    {
      _id: 'p005',
      name: 'Men’s Classic White T-Shirt',
      description: 'A comfortable and stylish white t-shirt made from 100% cotton, perfect for casual wear.',
      price: 499,
      image: [fan1],
      category: 'Men',
      subCategory: 'Topwear',
      size: ['S', 'M', 'L'],
      date: '2023-10-01',
      bestseller: true,
    },
    {
      _id: 'p006',
      name: 'Kids Cartoon Hoodie',
      description: 'Soft and cozy hoodie featuring fun cartoon prints, ideal for kids aged 3-10.',
      price: 899,
      image: [p2],
      category: 'Kids',
      subCategory: 'Topwear',
      size: ['S', 'M', 'L'],
      date: '2023-10-01',
      bestseller: true,
    },
    {
      _id: 'p007',
      name: 'Women’s Floral Top',
      description: 'Lightweight floral print top made with breathable fabric, suitable for summer days.',
      price: 749,
      image: [p1,p2,p3,p4],
      category: 'Women',
      subCategory: 'Topwear',
      size: ['S', 'M', 'L'],
      date: '2023-10-01',
      bestseller: true,
    },
    {
      _id: 'p008',
      name: 'Women’s Winter Sweater',
      description: 'Warm and elegant winter sweater made of wool blend to keep you cozy in cold weather.',
      price: 1499,
      image: [p1,p2,p3,p4],
      category: 'Women',
      subCategory: 'Winterwear',
      size: ['S', 'M', 'L'],
      date: '2023-10-01',
      bestseller: false,
    },
    {
      _id: 'p009',
      name: 'fan',
      description: 'Cute printed t-shirt for everyday wear, made with kid-friendly breathable fabric.',
      price: 399,
      image: [p1,p2,p3,p4],
      category: 'Kids',
      subCategory: 'Topwear',
      size: ['S', 'M', 'L'],
      date: '2023-10-01',
      bestseller: true,
    },
  ];
  