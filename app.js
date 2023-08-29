import express from 'express';
import { config } from 'dotenv';
import { userRouter } from './src/routers/user.routes.js';

config();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/public'))
app.set('view engine', 'ejs');

app.use('/users', userRouter);
