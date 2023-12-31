import express from 'express';
import { config } from 'dotenv';
import { userRouter } from './src/routers/user.routes.js';
import { sellerPostRouter } from './src/routers/sellerPost.routes.js';
import { buyerPostRouter } from './src/routers/buyerPost.routes.js';
import { adminRouter } from './src/routers/admin.routes.js';
import { checkTokenRouter } from './src/routers/checkToken.routes.js';
import cors from 'cors';
import { favoritesRouter } from './src/routers/favorites.routes.js';
import { commentRouter } from './src/routers/comment.routes.js';
import { categoryModel } from './src/models/categories.model.js';
import sha256 from 'sha256';
import { AdminModel } from './src/models/admin.model.js';

config();
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.use('/check-token', checkTokenRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/seller-post', sellerPostRouter);
app.use('/buyer-post', buyerPostRouter);
app.use('/favorites', favoritesRouter);
app.use('/comments', commentRouter);
