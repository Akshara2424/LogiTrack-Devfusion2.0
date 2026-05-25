import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
  }],
  totalAmount: Number,
  status: { 
    type: String, 
    enum: ['placed', 'confirmed', 'dispatched', 'out_for_delivery', 'delivered', 'returned'],
    default: 'placed' 
  },
  address: String,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'] },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trackingHistory: [{
    status: String,
    timestamp: Date,
    location: { lat: Number, lng: Number }
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);