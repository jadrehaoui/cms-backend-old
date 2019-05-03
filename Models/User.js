import mongoose, { Schema } from 'mongoose';
export default mongoose.model('user', new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  givenName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  has: {
    create: {type: Boolean, required: true, default: false},
    read: {type: Boolean, required: true, default: false},
    update: {type: Boolean, required: true, default: false},
    delete: {type: Boolean, required: true, default: false},
    admin: {type: Boolean, required: true, default: false},
    dev: {type: Boolean, required: true, default: false}
  },
  createdTs: {type: Date, default: Date.now},
  updatedTs: {type: Date, default: Date.now},
  createdBy: {type: String, required: true},
}));
