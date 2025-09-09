import express from 'express';
import { addProduct, listProducts, singleProduct,
     removeProduct, relatedProducts, searchProduct, totalProducts  } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// productRouter.post('/add', upload.single('image1'), addProduct);
productRouter.post('/add',adminAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount:1}, {name:'image3', maxCount:1},  {name:'image4', maxCount:1}]), addProduct);
productRouter.post('/list', listProducts);
// productRouter.get('/list', adminAuth, listProducts);

productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/relatedProducts', relatedProducts);
productRouter.post('/searchProduct', searchProduct);
productRouter.get('/totalProducts', totalProducts);

export default productRouter;