import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

await mongoose
  .connect(process.env.DB)
  .then(console.log('Connection'))
  .catch((err) => console.log(err));
