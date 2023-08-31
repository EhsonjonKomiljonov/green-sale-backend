import { Schema, Types, model } from 'mongoose';

const Admin = new Schema({
  admin_name: {
    type: String,
  },
  admin_email: {
    type: String,
  },
  admin_password: {
    type: String,
  },
});

export const AdminModel = model('admin', Admin);

