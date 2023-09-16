import { Schema, Types, model } from 'mongoose';

const comment = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user_ref_id: {
      type: Types.ObjectId,
      ref: 'users',
      key: '_id',
      required: true,
    },
    product_ref_id: {
      type: Types.ObjectId,
      ref: 'buyerPosts',
      ref: 'sellerPosts',
      key: '_id',
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

export const commentModel = model('comments', comment);
