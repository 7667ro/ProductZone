import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  imageUrls: {
    type: Array,
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
