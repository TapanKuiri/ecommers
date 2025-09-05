import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number, // Original price
    required: true,
  },

  discount: {
    type: Number, // Discount in percentage (optional)
    default: 0,
  },

  finalPrice: {
    type: Number, // Price after discount
    required: true,
  },

  image: {
    type: Array, // [img1, img2, img3, img4]
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  bestseller: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Number,
    required: true,
    default: Date.now,
  }
});

productSchema.index({ category: 1 });



const productModel = mongoose.models.products || mongoose.model('products', productSchema);
export default productModel;
