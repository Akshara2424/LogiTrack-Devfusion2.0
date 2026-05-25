import mongoose from 'mongoose';

const DeliveryAgentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
  isAvailable: { type: Boolean, default: true },
  earnings: { type: Number, default: 0 },
});

export default mongoose.models.DeliveryAgent || mongoose.model('DeliveryAgent', DeliveryAgentSchema);