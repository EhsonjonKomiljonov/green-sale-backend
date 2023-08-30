import { Schema, Types, model } from 'mongoose';

const sellerPost = new Schema(
  {
    category_ref_id: {
      type: Types.ObjectId,
      ref: 'categories',
      key: '_id',
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
    imgLink: {
      type: String,
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
