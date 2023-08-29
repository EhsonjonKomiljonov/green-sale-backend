import { Schema, Types, model } from 'mongoose';

const category = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  }
);

export const categoryModel = model('categories', category);

// await categoryModel.create([
//   {
//     name: 'Sabzavotlar',
//   },
//   {
//     name: 'Mevalar',
//   },
//   {
//     name: 'Poliz-Ekinlari',
//   },
// ]);
