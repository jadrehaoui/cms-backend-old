import mongoose, { Schema } from 'mongoose';
export default mongoose.model('product', new Schema({
  title: {type: String, required: true},
  quantity: {type: Number, default: 0, required: true},
  price: {type: Number, default: 0.00, required: true},
  description: String,
  createdTs: {type: Date, default: Date.now},
  updatedTs: {type: Date, default: Date.now},
  thumbnail: String,
  images: Array,
  createdBy: {type: String, required: true},
  updatedBy: {type: String, required: true},
  published: {type: Boolean, default: true},
  deleted: {type: Boolean, default: false}
}));
