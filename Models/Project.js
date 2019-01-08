import mongoose, { Schema } from 'mongoose';
export default mongoose.model('project', new Schema({
  title: {type: String, required: true},
  for: {type: String},
  url: {type: String},
  description: String,
  createdTs: {type: Date, default: Date.now},
  updatedTs: {type: Date, default: Date.now},
  thumbnail: String,
  images: Array,
  specs: Array,
  published: {type: Boolean, default: true},
  deleted: {type: Boolean, default: false},
  createdBy: {type: String, required: true},
  updatedBy: {type: String, required: true}
}));
