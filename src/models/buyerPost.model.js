import { Schema, Types, model } from 'mongoose';

const buyerPost = new Schema(
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
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  }
);

export const buyerPostModel = model('buyerPosts', buyerPost);
