import { Router } from 'express';
import { buyerPostContr } from '../controllers/buyerPost.contr.js';
import { checkToken } from '../middlewares/token.check.js'; 
export const buyerPostRouter = Router();

const buyerPost = new buyerPostContr();

buyerPostRouter
  .post('/', checkToken, buyerPost.buyerPostAdd)
  .get('/', buyerPost.buyerPostGet);
