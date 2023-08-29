import express from 'express';
import { config } from 'dotenv';
import { userRouter } from './src/routers/user.routes.js';
import { sellerPostRouter } from './src/routers/sellerPost.routes.js';

config();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/users', userRouter);
app.use('/seller-post', sellerPostRouter);
