import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  sku: String,
  image: String,
  category: String,
  businessOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);