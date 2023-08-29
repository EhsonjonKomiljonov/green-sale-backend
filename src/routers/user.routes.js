import { Router } from 'express';
import { UserContr } from '../controllers/user.contr.js';
import { userCheck } from '../middlewares/user.check.js';
export const userRouter = Router();

const user = new UserContr();

userRouter
  .get('/verify-email/:hashUrl', user.verifyEmail)
  .post('/', userCheck, user.post)
  .post('/login', user.login)
  .post('/reset-password', user.resetPassword);
