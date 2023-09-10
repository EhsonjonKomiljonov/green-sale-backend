import { Router } from 'express';
import { buyerPostContr } from '../controllers/buyerPost.contr.js';
import { checkToken } from '../middlewares/user.token.check.js';
export const buyerPostRouter = Router();

const buyerPost = new buyerPostContr();

buyerPostRouter
  .post('/', checkToken, buyerPost.buyerPostAdd)
  .get('/', buyerPost.buyerPostGet)
  .get('/:id', buyerPost.buyerPostGet)
  .put('/:id', checkToken, buyerPost.buyerPostPut)
  .delete('/:id', checkToken, buyerPost.buyerPostDelete);
