import { Schema, Types, model } from 'mongoose';

const sellerPost = new Schema(
  {
    category_ref_id: {
      type: Types.ObjectId,
      ref: 'categories',
      key: '_id',
      required: true,
    },
    user_ref_id: {
      type: Types.ObjectId,
      ref: 'users',
      key: '_id',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    capacityMeasure: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      min: 9,
      max: 13,
      required: true,
    },
    imgLink: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  }
);

export const sellerPostModel = model('sellerPosts', sellerPost);
