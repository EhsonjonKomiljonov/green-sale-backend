import express from 'express';
import { config } from 'dotenv';
import { userRouter } from './src/routers/user.routes.js';
import { sellerPostRouter } from './src/routers/sellerPost.routes.js';
import { buyerPostRouter } from './src/routers/buyerPost.routes.js';
import { adminRouter } from './src/routers/admin.routes.js';
import { checkTokenRouter } from './src/routers/checkToken.routes.js';
import cors from 'cors';

config();
export const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.use('/check-token', checkTokenRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/seller-post', sellerPostRouter);
app.use('/buyer-post', buyerPostRouter);
