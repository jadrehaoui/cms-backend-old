import mongoose, { Schema } from 'mongoose';
export default mongoose.model('form', new Schema({
  title: {type: String, required: true},
  obj: String,
  createdTs: {type: Date, default: Date.now},
  updatedTs: {type: Date, default: Date.now},
  createdBy: {type: String, required: true},
  updatedBy: {type: String, required: true},
  published: {type: Boolean, default: true},
  deleted: {type: Boolean, default: false}
}));
